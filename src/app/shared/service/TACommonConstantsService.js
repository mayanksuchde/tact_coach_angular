app.service('TACommonConstantsService', function ($http, $q) {
    var settingsmenu = [
        { name: 'Basic Details', link: '.basicDetails', icon: 'fa-line-chart' }
        ,{ name: 'address', link: '.address', icon: 'fa-map-marker' }
        ,{ name: 'password', link: '.password', icon: 'fa-key' }
        ,{ name: 'credits', link: '.credits', icon: 'fa-usd' }
        //,{ name: 'subscriptions', link: '.subscriptions', icon: 'fa-newspaper-o' }
        //,{ name: 'Secret admirer', link: '.secret_admirer', icon: 'fa-line-chart' }
        ,{ name: 'Market Predictions', link: '.job_predictions', icon: 'fa-line-chart' }
        //,{ name: 'Recommendations', link: '.recommendations', icon: 'fa-line-chart' }
        ,{ name: 'Goals', link: '.goals', icon: 'fa-line-chart' }
        //,{ name: 'Learning Analytics', link: '.problem_solving_archive', icon: 'fa-line-chart' }
        //,{ name: 'Resume Analysis', link: '.resume_analysis', icon: 'fa-line-chart' }
        //,{ name: 'My Journey', link: '.journey', icon: 'fa-line-chart' }
        ,{ name: 'Project links', link: '.projectLinks', icon: 'fa-line-chart' }
        //,{ name: 'Articles', link: '.articles', icon: 'fa-line-chart' }
    ];

    var settingsMenuEmployer = [
        { name: 'Basic Details', link: '.basicDetails', icon: 'fa-line-chart' },
        { name: 'address', link: '.address', icon: 'fa-map-marker' },
        { name: 'password', link: '.password', icon: 'fa-key' },
        { name: 'credits', link: '.credits', icon: 'fa-usd' },
        //{ name: 'subscriptions', link: '.subscriptions', icon: 'fa-newspaper-o' },
        //{ name: 'Secret admirer', link: '.secret_admirer', icon: 'fa-line-chart' },
        { name: 'Market Predictions', link: '.job_predictions', icon: 'fa-line-chart' },
        //{ name: 'Recommendations', link: '.recommendations', icon: 'fa-line-chart' },
        { name: 'Goals', link: '.goals', icon: 'fa-line-chart' },
        //{ name: 'Learning Analytics', link: '.problem_solving_archive', icon: 'fa-line-chart' },
        //{ name: 'Resume Analysis', link: '.resume_analysis', icon: 'fa-line-chart' },
        //{ name: 'My Journey', link: '.journey', icon: 'fa-line-chart' },
        { name: 'Project links', link: '.projectLinks', icon: 'fa-line-chart'}
        // { name: 'Company', link: '.companyInfo', icon: 'fa-line-chart' },
        // { name: 'Job', link: '.jobInfo', icon: 'fa-line-chart' }
    ];
    
    var predictions = {
        "general": [
            {
                "technology": "Angular Vs ReactJs",
                "scope": "AngularJs is 21% above the ReactJs in Chennai market. However both are in high demand comparing other front end programming."
            },
            {
                "technology": "Demanding Java Frameworks",
                "scope": "Java still tops the list in Chennai and Hyderabad requirements. However employers are not only looking for Java, but also any framework related to Java (like Spring REST)."
            }
        ],
        "personalized": [
            {
                "technology": "Leading Laravel",
                "scope": "Laravel reaching all top high in PHP frameworks"
            }
        ]
    };

    return {
        settingsMenu: settingsmenu,
        settingsMenuEmployer: settingsMenuEmployer,
        predictions: predictions
    };
});
