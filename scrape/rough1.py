from bs4 import BeautifulSoup
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

import json

from time import sleep, time

from datetime import date, timedelta

start_time = time()

class NextDate:
    def __init__(self, year, month, day):
        self.current_date = date(year, month, day)

    def __repr__(self) -> str:
        return f'{self.current_date.year}-{self.current_date.month}-{self.current_date.day}'

    def update_to_next_day(self):
        self.current_date += timedelta(days=1)

def format_nutrition_text(text: str):
    no_nl = text.strip().replace('\n', ' ').replace('\u00ae', '')
    name, amount = '',''
    for i, l in enumerate(no_nl):
        # Split up string if char is a digit or unicode special char (like 1/2 char)
        if l.isdigit() or not (l.isalpha() or l.isspace()):
            name = no_nl[:i].strip()
            amount = no_nl[i:].strip()
            break
    return (name, amount)    

def format_item_name(text: str):
    return text.strip().replace('\n', ' ').replace('\u00ae', '').strip()

def handle_exception(day, e):
    print(day)
    if e>5: quit()

j=0
curDate = NextDate(2023, 8, 23)

with open("results.json", "r") as json_file:
    all = json.load(json_file)

e=0

while j < 1:
    with open("results.json", "r") as json_file:
        all = json.load(json_file)

    j += 1


    URL = f'https://dining.unc.edu/locations/top-of-lenoir/?date={curDate}'

    response = requests.get(URL)

    soup = BeautifulSoup(response.content, 'html.parser')

    # Open chrome to the URL
    driver = webdriver.Chrome()
    driver.get(URL)

    # Init day's dict
    day = {}
    # Get all meals
    meals = soup.find_all('a', class_='c-tabs-nav__link')
    
    m=0
    for i, meal_type in enumerate(meals):
        i=0
        m+=1

        print("Meal: " + str(m))

        meal_name = str(meal_type.text).strip()
        if len(meal_type['class']) == 1:
            try:
                element = driver.find_element(By.CSS_SELECTOR, f'a[data-tabid="{meal_type["data-tabid"]}"]')
                driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)
                element.click()
                sleep(1)
                # Update the soup for the new page
                soup = BeautifulSoup(driver.page_source, 'html.parser')
            except Exception as e:
                e+=1
                print(f"Error occurred while opening meal tab: {e}")
                handle_exception(day, e)

        # Find the active meal
        active_meal = soup.find('div', class_='is-active')

        # Find all of the collapsed menu stations to then open them
        collapsed_stations = active_meal.find_all('h4', class_='station-collapsed')
        for station in collapsed_stations:
            try:
                element = driver.find_element(By.CSS_SELECTOR, f'h4[data-id="{station["data-id"]}"]')
                driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)
                element.click()
            except Exception as e:
                e+=1
                print(f"Error occurred while opening closed menu tabs: {e}")
                handle_exception(day, e)

        # Wait for click to finish
        WebDriverWait(driver, 10).until_not(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'div.is-active h4.station-collapsed'))
        )

        # Update the soup for the new page
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        active_meal = soup.find('div', class_='is-active')

        # Now all menu stations are opened and all menu items are clickable
        # Find all stations
        stations = BeautifulSoup(str(active_meal), 'html.parser').find_all('div', class_='menu-station')
        # Init dict of meal data
        meal = {}

        s=0
        # Iterate through all stations
        for station in stations:
            s+=1

            print("Station: " + str(s))

            # Make a soup of the station
            stationSoup = BeautifulSoup(str(station), 'html.parser')
            # Get the name of the station
            station_name = stationSoup.find('h4', class_='toggle-menu-station-data').text


            #print("Station Name: " + station_name)


            # Init station dict in meal
            meal[station_name] = {}
            # Find all of the menu items in the station
            menu_items = stationSoup.find_all('a', class_='show-nutrition')

            # Loop through each menu item and click on it to get the nutrition data, then click to close it
            for item in menu_items:


                #print("Data Recipe: " + item['data-recipe'])
                i += 1
                if i % 30 == 0:
                    print(i)

                # Click on menu item to open nutrition tab
                try:
                    element = driver.find_element(By.CSS_SELECTOR, f'div.is-active a[data-recipe="{item["data-recipe"]}"]')
                    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)
                    element.click()
                except Exception as e:
                    e+=1
                    print(f"Error occurred while opening nutrition tab: {e}")
                    handle_exception(day, e)
                
                # Wait for nutrition tab to open
                # Wait .2 seconds for extra safety
                sleep(.2)
                WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CLASS_NAME, 'nutrition-facts-table'))
                )

                # Get the updated page source
                newSoup = BeautifulSoup(driver.page_source, 'html.parser')
                # Name of item
                item_name = newSoup.find('div', id='nutrition-slider').find('h2').text


                #print("Item Name: " + item_name)


                # Nutrition data
                nutrition_section_text = [format_nutrition_text(i.text) for i in newSoup.find_all('th')]
                # Init nurtition dict
                nutrition = {}
                # Add nutrition data to dict
                for type, amount in nutrition_section_text:
                    nutrition[type] = amount
                # Add item to station dict
                meal[station_name][item_name] = nutrition

                try:
                    closeButton = driver.find_element(By.CLASS_NAME, 'close-nutrition')
                    closeButton.click()
                except Exception as e:
                    e+=1
                    print(f"Error occurred while closing nutrition tab: {e}")
                    handle_exception(day, e)
                # Wait .4 s for extra safety
                sleep(.4)
        # Add meal to day dict
        day[meal_name] = meal
    # Add day to all dict
    all[curDate.__repr__()] = day
    curDate.update_to_next_day()
            
    open('results.json', 'w').write(json.dumps(all, indent=4))

print(all)

driver.close()

print(f"Time taken: {time() - start_time} seconds")
