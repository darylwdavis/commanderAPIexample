# API Login and Object Query Example Using JQuery and Bootstrap
Provides a framework for developing your interface to KMC Controls Commander API

Getting Started

This document introduces the available REST API for accessing your data in the cloud.

Documentation

All of this documentation is available at https://api.docs.kmccommander.com/

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
