# CSC 131 Project

** Project Background **
This project was created for CSC 131: Computer Software Engineering, an upper division computer science class at Sacramento State. The project was created by Mohamed Burhan, Maxwell Rutherford, Noah Ramones, Abdullah Mahmood, Gene Arellano, and Mustafa El Attar. The project was sponsored by Vendia, a 

** Project Details **
This web app uses React and Bootstrap for the front end, Vendia (project sponsor) for the backend, Firebase for the authentication, and Github for version control. 

When first opening up the web app, you are presented with a login page. This allows the data to be kept private, and also allows the app to see whether the user logged in is a regular or admin user.

For regular users, they're able to look at the list of current devices on the Home page and check the summary of these devices which shows the total number of tests assigned to the device, the amount that have been completed and incompleted, and a progress bar to summarize this data. Then on the Device Tests page, users are able to look at all device tests in progress for each device. If the user logged in belongs to one of the device tests' organization assignment (parsed from email address used to log in), then they're able to edit these tests. If a regular user goes to the Add Test page, they're presented with a permission denied screen that is accompanied by a request form they're able to fill out and send to an admin so they can add the test.

For administrative users (checked by parsing login email address), the Home page allows them to remove whole devices while also being able to check the summary like regular users. They're also able to add devices with a textbar and "Add Device" button at the top of the Current Devices list. On the Device Tests page, administrators are able to update and remove any test on the list, regardless of their organization assignment. On the Add Test page, administrators are presented with all of the available options of creating a test. They're able to select a device they want to add a test to from a drop down menu, provide an integer ID, select the organization the test should be assigned to, give the test a name, a method, and add any extra notes. 

All of this data is stored and fetched through Vendia's backend services, all of the data on the web app will be consistent with the data stored on Vendia's site through our team's account. 
