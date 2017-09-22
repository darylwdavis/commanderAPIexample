# API Point and History Example
Provides a framework for developing your interface to KMC Controls Commander API

Getting Started

This document introduces the available REST API for accessing your data in the cloud.

Documentation

All of this documentation is available at http://

Tags

All entities in the cloud database are tagged with Haystack tags.    
Standard tags compiled by the Haystack community are at http://project-haystack.org and there is other documentation there.

// logging in

POST user email and password to the project server

url: https://projects.kmccontrols.com/loginAJAX

data:{email: userName@provider.com, password: password123}

GET the licenses assigned to this user

url: https://projects.kmccontrols.com/users/me/activelicenses

Select the license that matches the desired project. Use the cryptokey to sign into the cloud project.

	GET https://commander2.kmccontrols.com/setlicense/[cryptokey]

Getting Data
A Device is tagged as a 'device', so searching through the database for all entities with that tag will get you the list of devices
dicovered on the network.  

// Query the Database


We can filter the search by looking for a particular name such as the ‘dis’ tag:
  
//Examples

•	Get device list

•	Find particular device(s) that match criteria, such as those marked as vav or meter

Read all vav
		Returns a list of all devices with a vav tag.

Read all meters
		Returns a list of devices with a meter tag.
		Query by unit of measure
			Returns a list of points with kWh unit of measure.

Read all Schedules
	Returns a list of points that can be scheduled.

Read all Alarms


Read all equipment named “RTU1”.

•	Find all points that are energy points on a device

•	Find all points that are energy points in the systems

•	Get history of energy values

Return today’s energy history from the ElecMeter device. 

You can replace “today” with a specific date.
	[Returns the history from October 1.]

Or use a date range:
	(2015-10-01..2015-10-08)
Returns the history from October 1 through October 8

•	Read the present value of a BACnet point

Reads the present value of property AV40 on a device named “Room 103”

•	Set the present value of a BACnet point

Writes a value of 77 at priority 8 to property AV40 on a connector named “Room 103”
