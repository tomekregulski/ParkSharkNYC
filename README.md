# ParkSharkNYC

Go to the deployed application here: <div style="display: inline">https://ladystephani.github.io/ParkSharkNYC/</div>

* [Team Members](#team-members)
* [Description ](#description)
* [Technical Notes](#technical-notes)
* [Installation and Usage](#installation-and-use)
* [License](#license)

## Team Member
Zhe Qi (Jessie) Li
Samy Ozuna
Sean Weber
Tomek Regulski

## Description

ParkSharkNYC is an app designed for users who enjoy visiting New York City Parks, enjoying the nature and other features (such as historical monuments), and writing about their visits. 

The app opens to a "planning" page, presenting the user with the option to either press a button that submits their coordinates, or search by zip code. In either case, a function will search through an array of NYC park properties and select all that are within a mile of the search copordinates. 

Once the relevant parks are selected, they are both plotted onto a map, as well as rendered as search results. The user is then able to see the park name, its address, and whether or not it features historical monuments or official trails. From here, the user can plan their next park adventure!

A second page, titled 'Journal', allows the user to log their park experience as a simple journal entry, which gets stored in localStorage. They are able to view all past entries by pressing the "Show Memories" button, which then renders a table that can be sorted either by date or park name. 

## Technical Notes

This app makes use of HTML, CSS, JavaScript, Material.io, Google Maps API, and NYC Open Data APIs.

The NYC Open Data APIs that we used are Park Properties, Trails, and Monuments. When the app first loads, a function is triggered to make a request to the Park Properties API, collect the names, addresses, and coordinates of the parks, and store them in the local array 'parksArray'. 

Once that process has completed, requests are made to the Trails and Monuments APIs to retrieve the names of parks that contain either of these features, and integrated with parksArray. This allows the search results to display whether or not each park features monuments or official trails. 

Similarly, the Google Maps API is used to show the locations of the search results on a map, which is centered on the search coordinates. If the user presses on a pin, they will see an info box appear that shows the park name, and whether or not it features trails or monuments. 

## Installation and Use

Clone the repo and open the folder in the code editor of your choice. Open index.html in the browser of your choice, and plan your next park adventure!

# License

MIT License

Copyright (c) [2021] [Jessie Li, Samy Ozuna, Sean Weber, Tomek Regulski]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.