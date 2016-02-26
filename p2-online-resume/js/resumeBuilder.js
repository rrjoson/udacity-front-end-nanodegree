/*
This is empty on purpose! Your code to build the resume will go here.
 */
var bio = {
    "name": "Ricardo Joson",
    "role": "Front-End Web Developer",
    "welcomeMessage": "Ricardo Raphael Joson is a front-end web development intern at a startup company in the Philippines. He studied Music in college for 4 years before he left to study programming on his own. He plans to finish the Front-End Nanodegree as a preparation for the Full-Stack Nanodegree.",
    "image": "images/logo.jpg",
    "contacts": {
        "mobile": "+63 917 503 2886",
        "twitter": "rrjoson",
        "skype": "rrjoson",
        "location": "Manila, Philippines",
        "email": "rr_joson@yahoo.com"
    },
    "skills": ["HTML5", "CSS3", "Javascript", "Wordpress"]
};

var work = {
    "jobs": [{
        "employer": "Potatocodes Inc.",
        "title": "Front-End Web Development Intern",
        "dates": "2015-Present",
        "location": "Manila, Philippines",
        "description": "Tasks include converting Photoshop designs to HTML/CSS."
    }, {
        "employer": "Kalibrr",
        "title": "Front-End Web Development Engineer",
        "dates": "2016-Present",
        "location": "Makati, Philippines",
        "description": "Tasks include maintaining the main website."
    }, {
        "employer": "Trulia",
        "title": "Full-Stack Web Development Engineer",
        "dates": "2017-Present",
        "location": "San Francisco, CA",
        "description": "Tasks include maintaining the main website."
    }]
};

var projects = {
    "project": [{
        "title": "Philippines Association for Graduate Education",
        "dates": "2015",
        "description": "Philippines Association for Graduate Education Philippines Association for Graduate Education",
        "images": ["images/1.png", "images/2.png", "images/3.png"]
    }, {
        "title": "Bike 2 Rush",
        "dates": "2015",
        "description": "Bike 2 Rush Bike 2 Rush Bike 2 Rush Bike 2 Rush",
        "images": ["images/4.png", "images/5.png", "images/6.png"]
    }, {
        "title": "Univeristy of the Philippines Manila",
        "dates": "2015",
        "description": "Univeristy of the Philippines Manila Univeristy of the Philippines Manila",
        "images": ["images/7.png", "images/8.png", "images/9.png"]
    }]
};

var education = {
    "schools": [{
        "name": "University of Santo Tomas",
        "location": "Manila, Philippines",
        "degree": "Music",
        "major": "Piano Performance",
        "dates": "2010-2014",
        "url": "http://www.ust.edu.ph/"
    }, {
        "name": "Beijing Language and Culture University",
        "location": "Beijing, China",
        "degree": "Language",
        "major": "Mandarin Chinese",
        "dates": "2014-2015",
        "url": "http://english.blcu.edu.cn/"
    }],
    "online courses": [{
        "title": "Front-End Web Developer Nanodegree",
        "school": "Udacity",
        "dates": "2015",
        "url": "https://www.udacity.com/nanodegree"
    }, {
        "title": "Full-Stack Web Developer Nanodegree",
        "school": "Udacity",
        "dates": "2016",
        "url": "https://www.udacity.com/nanodegree"
    }]
};

//Bio
bio.display = function() {
    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
    var formattedImage = HTMLbioPic.replace("%data%", bio.image);
    var formattedMessage = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
    $("#header").prepend(formattedName, formattedRole).append(formattedImage, formattedMessage);
    $("#header").append(HTMLskillsStart);
    for (var skill = 0; skill < bio.skills.length; skill++) {
        var formattedSkills = HTMLskills.replace("%data%", bio.skills[skill]);
        $("#header").append(formattedSkills);
    }
    var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
    var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
    var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
    var formattedSkype = HTMLcontactGeneric.replace("%contact%", "skype").replace("%data%", bio.contacts.skype);
    $("#footerContacts").append(formattedMobile, formattedEmail, formattedTwitter, formattedSkype);
};

//Education
education.display = function() {
    for (var school in education.schools) {
        $("#education").append(HTMLschoolStart);
        var formattedName = HTMLschoolName.replace("%data%", education.schools[school].name);
        var formattedDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
        var formattedDates = HTMLschoolDates.replace("%data%", education.schools[school].dates);
        var formattedLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);
        var formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[school].major);
        $(".education-entry:last").append(formattedName + formattedDegree, formattedDates, formattedLocation, formattedMajor);
    }
    //TODO: Make an if statement
    if (education["online courses"].length !== 0) {
        $("#education").append(HTMLonlineClasses);
    }
    for (var course in education["online courses"]) {
        $("#education").append(HTMLschoolStart);
        var formattedTitle = HTMLonlineTitle.replace("%data%", education["online courses"][course].title);
        var formattedSchool = HTMLonlineSchool.replace("%data%", education["online courses"][course].school);
        var formattedDates = HTMLonlineDates.replace("%data%", education["online courses"][course].dates);
        var formattedURL = HTMLonlineURL.replace("%data%", education["online courses"][course].url);
        $(".education-entry:last").append(formattedTitle + formattedSchool, formattedDates, formattedURL);
    }
};

//Work
work.display = function() {
    for (var job in work.jobs) {
        $("#workExperience").append(HTMLworkStart);
        var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
        var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
        var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
        var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
        var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
        $(".work-entry:last").append(formattedEmployer + formattedTitle, formattedDates, formattedLocation, formattedDescription);
    }
};

//Projects
projects.display = function() {
    for (var item in projects.project) {
        $("#projects").append(HTMLprojectStart);
        var formattedTitle = HTMLprojectTitle.replace("%data%", projects.project[item].title);
        var formattedDates = HTMLprojectDates.replace("%data%", projects.project[item].dates);
        var formattedDescription = HTMLprojectDescription.replace("%data%", projects.project[item].description);
        $(".project-entry:last").append(formattedTitle, formattedDates, formattedDescription);
        for (var image in projects.project[item].images) {
            var formattedImage = HTMLprojectImage.replace("%data%", projects.project[item].images[image]);
            $(".project-entry:last").append(formattedImage);
        }
    }
};

bio.display();
education.display();
work.display();
projects.display();

function inName(name) {
    var fullName, firstName, lastName;
    fullName = name.split(" ");
    firstName = fullName[0].toLowerCase();
    firstName = firstName.slice(0,1).toUpperCase() + firstName.slice(1);
    lastName = fullName[1].toUpperCase();
    fullName = firstName + " " + lastName;
    return fullName;
}

$("#main").append(internationalizeButton);
$("#mapDiv").append(googleMap);