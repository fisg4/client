from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

#Set up webdriver
driver = webdriver.Chrome()

#variables for user info
email = "test@example.com"
username = "testuser"
password = "testpassword"

#Navigate to the page
driver.get("http://localhost:3000")

# Click on the profile button
profile_button = driver.find_element_by_id("profile")
profile_button.click()

# Click on the register button
register_button = driver.find_element_by_id("register")
register_button.click()

# Input email, username, password and confirm password
email_field = driver.find_element_by_id("email")
email_field.send_keys(email)

username_field = driver.find_element_by_id("username")
username_field.send_keys(username)

password_field = driver.find_element_by_id("password")
password_field.send_keys(password)

confirm_password_field = driver.find_element_by_id("confirmPassword")
confirm_password_field.send_keys(password)

#submit the form
submit_button = driver.find_element_by_id("submit")
submit_button.click()

# Handle the alert and accept it
alert = WebDriverWait(driver, 10).until(EC.alert_is_present())
alert.accept()

#check if the page is /me
assert driver.current_url == 'http://localhost:3000/me'

#Input email and password and log in
email_field = driver.find_element_by_id("email")
email_field.send_keys(email)

password_field = driver.find_element_by_id("password")
password_field.send_keys(password)

login_button = driver.find_element_by_id("login")
login_button.click()

# Handle the alert and accept it
alert = WebDriverWait(driver, 10).until(EC.alert_is_present())
alert.accept()

# Close the browser
driver.quit()
