/**
* Tact
*
*/
(function () {
	'use strict';

	angular
		.module('app', [
			'ui.router',
			'ngAnimate',
			'ngMessages',
			'ngStorage',
			'ngSanitize',
			'ui-notification',
			'ui.router.state.events',
			'rzModule',
			'ui.bootstrap',
			'ngMaterial'
		])
		.config(config)
		.run(run);

	// safe dependency injection
	// this prevents minification issues
	config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$qProvider'];
	run.$inject = ['$rootScope', '$location', 'Authentication', 'Global'];

	/**
	 * App routing
	 *
	 * You can leave it here in the config section or take it out
	 * into separate file
	 *
	 */
	function config($stateProvider, $urlRouterProvider, $locationProvider, $qProvider) {
		// routes
		$urlRouterProvider.otherwise('/');

		$stateProvider

			// index
			.state('index', {
				url: "/",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					'container-view': {
						templateUrl: "app/home/home.html",
						controller: 'HomeController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			.state('login', {
				url: "/login",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: "app/login/login.html",
						controller: 'LoginController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			.state('register', {
				url: "/register",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: "app/register/register.html",
						controller: "RegisterController",
						controllerAs: "vm"
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			.state('forgot', {
				url: "/forgot",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: "app/forgot/forgot.html",
						controller: "ForgotController",
						controllerAs: "vm"
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})
			
			.state('resetpass', {
				url: "/cview/update/password/by/token?token=",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: "app/forgot/reset-password.html",
						controller: "ResetPasswordController",
						controllerAs: "vm"
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			// coach page information starts
			
			//linedin info public page
			.state('linkedin-profiles', {
				url: "/linkedin-profiles",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/linkedin-profiles/linkedin-profiles.html',
						controller: 'LinkedinProfilesController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
				requireLogin: true
			})

			// coach page information ends

			.state('company-info', {
				url: "/company/:companyId",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/company/company.html',
						controller: 'CompanyController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			.state('article', {
				url: "/article/:articleId",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/article/article.html',
						controller: 'ArticleController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			.state('feeds', {
				url: "/feeds",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/feeds/feeds.html',
						controller: 'FeedController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			.state('challenges', {
				url: "/challenges",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/challenge/challenges.html',
						controller: 'ChallengesController',
						controllerAs: 'vm'
					},
					'footer-view': {
						templateUrl: "app/shared/partials/footer.html"
					},
				},
				//requireLogin: true
			})
			
			//challenge_leaderboard
			.state('challenges-leaderboard', {
				url: "/challenge-leaderboard",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/challenge/challenge_leaderboard.html',
						controller: 'WeeklyChallengesController',
						controllerAs: 'vm'
					},
					'footer-view': {
						templateUrl: "app/shared/partials/footer.html"
					},
				},
			})

			//weekly-admin-report
			.state('weekly-admin-report', {
				url: "/weekly-admin-report",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/weekly-admin/weekly_admin.html',
						controller: 'WeeklyAdminController',
						controllerAs: 'vm'
					},
					'footer-view': {
						templateUrl: "app/shared/partials/footer.html"
					},
				},
			})


			.state('challenge', {
				url: "/challenge/:title",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/challenge/challenge.html',
						controller: 'ChallengeController',
						controllerAs: 'vm'
					},
					'footer-view': {
						templateUrl: "app/shared/partials/footer.html"
					},
				},
				//requireLogin: true
			})
			
			
			.state('mentor', {
				url: "/mentor/:title",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/mentor/mentor.html',
						controller: 'MentorController',
						controllerAs: 'vm'
					},
					'footer-view': {
						templateUrl: "app/shared/partials/footer.html"
					},
				},
				//requireLogin: true
			})
			
			.state('make-payment', {
				url: "/make/payment",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/paypal/make-payment.html',
						controller: 'PaypalController',
						controllerAs: 'vm'
					},
					'footer-view': {
						templateUrl: "app/shared/partials/footer.html"
					},
				},
				//requireLogin: true
			})
			
			
			.state('complete-payment', {
				url: "/complete/payment",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/paypal/complete-payment.html',
						controller: 'PaypalCompleteController',
						controllerAs: 'vm'
					},
					'footer-view': {
						templateUrl: "app/shared/partials/footer.html"
					},
				},
				//requireLogin: true
			})

			.state('accounts', {
				url: "/accounts",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: "app/accounts/accounts.html",
					},
					"right-view@accounts": {
						template: "<about-me-component></about-me-component>"
					},
					'footer-view': {
						template: "<page-short-footer></page-short-footer>"
					},
				},
				requireLogin: true
			})

			.state('accounts.aboutme', {
				url: "/about-me",
				views: {
					'right-view@accounts': {
						template: "<about-me-component></about-me-component>"
					}
				},
				requireLogin: true
			})

			.state('accounts.skills', {
				url: "/skills",
				views: {
					'right-view@accounts': {
						template: "<skills-component></skills-component>"
					}
				},
				requireLogin: true
			})

			.state('accounts.activities', {
				url: "/activities",
				views: {
					'right-view@accounts': {
						template: "<coding-activities-component></coding-activities-component>"
					}
				},
				requireLogin: true
			})

			.state('accounts.problemsolved', {
				url: "/problem-solved",
				views: {
					'right-view@accounts': {
						template: "<problem-solved-component></problem-solved-component>"
					}
				},
				requireLogin: true
			})

			.state('accounts.learned', {
				url: "/learned",
				views: {
					'right-view@accounts': {
						template: "<learned-component></learned-component>"
					}
				},
				requireLogin: true
			})

			.state('message', {
				url: "/message",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: "app/message/message.html",
						controller: 'messageController',
						controllerAs: 'vm'
					},
					"right-view@settings": {
						template: "<messages-component></messages-component>"
					},
					'footer-view': {
						template: "<page-short-footer></page-short-footer>"
					},
				},
				requireLogin: true
			})
			
			.state('message.messages', {
				url: "/messages",
				views: {
					'right-view@settings': {
						template: "<messages-component></messages-component>"
					}
				},
				requireLogin: true
			})
			
			.state('settings', {
				url: "/settings",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: "app/settings/settings.html",
						controller: 'settingsController',
						controllerAs: 'vm'
					},
					"right-view@settings": {
						template: "<basic-detail-component></basic-detail-component>"
					},
					'footer-view': {
						template: "<page-short-footer></page-short-footer>"
					},
				},
				requireLogin: true
			})
			
			.state('settings.basicDetails', {
				url: "/basic-details",
				views: {
					'right-view@settings': {
						template: "<basic-detail-component></basic-detail-component>"
					}
				},
				requireLogin: true
			})
			
			.state('settings.address', {
				url: "/address",
				views: {
					'right-view@settings': {
						template: "<address-component></address-component>"
					}
				},
				requireLogin: true
			})
				
			.state('settings.password', {
				url: "/password",
				views: {
					'right-view@settings': {
						template:"<password-component></password-component>"
					}
				},
				requireLogin: true
			})			
			
			.state('settings.credits', {
				url: "/credits",
				views: {
					'right-view@settings': {
						templateUrl: 'app/settings/credits/credits.html',
						controller: 'CreditsController',
						controllerAs: 'vm'				
					}
				},
				requireLogin: true
			})
			
			.state('settings.credits-info', {
				url: "/credits-info",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/settings/credits/credits-info.html'
					}
				},
			})
			
			.state('settings.marketPredictions', {
				url: "/market-predictions",
				views: {
					'right-view@settings': {
						template: "<market-predictions-component></market-predictions-component>"
					}
				},
				requireLogin: true
			})
			
			/* goal settings*/
			.state('settings.goals', {
				url: "/goals",
				views: {
					'right-view@settings': {
						template: "<goals-component></goals-component>"
					}
				},
				requireLogin: true
			})
			
			.state('settings.projectLinks', {
				url: "/project-links",
				views: {
					'right-view@settings': {
						template: "<project-links-component></project-links-component>"
					}
				},
				requireLogin: true
			})
			.state('resume', {
				url: "/resume",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: "app/resume/resume.html",
						controller: 'ResumeController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-short-footer></page-short-footer>"
					},
				},
				requireLogin: true
			})
			
			.state('test', {
				url: "/test",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: "app/general/test.html",
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})
			
			.state('view-profile', {
				url: "/view-profile",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						template: "<view-profile-component></view-profile-component>",
					},
					'footer-view': {
						template: "<page-short-footer></page-short-footer>"
					},

				},
				requireLogin: true
			})
			
			.state('learning-strategies', {
				url: "/strategy",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/strategy/strategy.html',
						controller: 'StrategyController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			.state('learning-strategy', {
				url: "/strategies/:url",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/strategy/strategies.html',
						controller: 'StrategyController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})


			.state('dotw', {
				url: "/developer-of-the-week",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/general/dotw.html',
						//controller: 'DOTWController',
						//controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})
			
			.state('article1', {
				url: "/article1",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/general/article1.html',
						//controller: 'DOTWController',
						//controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			.state('dummy', {
				url: "/dummy",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/dummy/dummy.html',
						//controller: 'DOTWController',
						//controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			.state('dummy1', {
				url: "/dummy1",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/dummy/dummy1.html',
						//controller: 'DOTWController',
						//controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			.state('dummy2', {
				url: "/dummy2",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/dummy/dummy2.html',
						//controller: 'DOTWController',
						//controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			.state('dummy3', {
				url: "/dummy3",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/dummy/dummy3.html',
						//controller: 'DOTWController',
						//controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})
			
			.state('leanrning_strategies', {
				url: "/learning/strategies",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/general/leanrning_strategies.html',
						controller: 'LearningStrategiesContoller',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})
			
			.state('score_calculation', {
				url: "/scorecalc",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/general/score_calculation.html',
						//controller: 'DOTWController',
						//controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})
			
			.state('la_howto', {
				url: "/la/howto",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/general/la_howto.html',
						//controller: 'DOTWController',
						//controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			//fake-compasny-search

			.state('fake-company-search', {
				url: "/fake-company-search",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/fakecompany/fake_company_search.html',
						controller: 'companySearchController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			//fake-company-result

			.state('fake-company-result', {
				url: "/fake-company-result",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/general/fake_company_result.html',
						//controller: 'DOTWController',
						//controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})
			
			.state('gift', {
				url: "/gift",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/general/gift.html',
						//controller: 'DOTWController',
						//controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})
			
			.state('privacy', {
				url: "/privacy",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/general/privacy.html',
						//controller: 'DOTWController',
						//controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			.state('fake-company-identifier', {
				url: "/fake-company-identifier",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/fake-company-identifier/fake-company-identifier.html',
						controller: 'FCIController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			// behavioral-and-technical-test
			/*.state('behavioral-and-technical-test', {
				url: "/bat/test/:technology",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/behavioral-and-technical-test/behavioral-technical-test.html',
						controller: 'BATController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})*/

			//behavioral-and-technical-test-result
			.state('behavioral-and-technical-test-result', {
				url: "/test/:company/:technology",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/behavioral-and-technical-test/behavioral-technical-test.html',
						controller: 'SevenPiratesCtrl',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

		
			
			.state('publicview-rockstar-profile', {
				url: "/rockstar/:rid",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/publicview/rockstar/viewprofile.html',
						controller: 'RSPController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				}
			})

			//Tact Ranking and models
			.state('tact-ranking-medal', {
				url: "/ranking",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/general/ranking_model.html',
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				}
			})

			//Tact Effort insurance
			.state('tact-effort-insurance', {
				url: "/tact-effort-insurance",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/general/effort_insurance.html',
						//controller: 'RSPController',
						//controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				}
			})
            
            //Expert info
			.state('expert-info', {
				url: "/expert-info",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/general/expert_info.html',
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				}
			})
			
			//Mentor info
			.state('mentor-info', {
				url: "/mentor-info",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/general/mentor_info.html',
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				}
			})
			
			//Ambassadors Info
			.state('ambassador-info', {
				url: "/ambassador-info",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/general/ambassador_info.html',
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				}
			})
            
			//MicroHacking Feature
			.state('micro-hacking-feature', {
				url: "/hackingfeature",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/general/micro_hacking.html',
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				}
			})

			//anonymous-referral
			.state('anonymous-referral', {
				url: "/anonymous",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/anonymous-referral/anonymous.html',
						controller: 'anonymousController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				}
			})

			//company-job-info

			.state('company-job-info', {
				url: "/jobs/:company_name/:position_name",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/company-job-info/company_job_info.html',
						controller: 'JobController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				}
			})

			//psa-entries

			.state('psa-entries', {
				url: "/show/entries?email",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/psa-entries/psa_entries.html',
						controller: 'psaController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				}
			})

			//psa-entries-leaderboard

			.state('psa-entries-leaderboard', {
				url: "/psa/leaderboard",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/psa-entries/psa_leaderboard.html',
						//controller: 'psaController',
						//controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				}
			})


			//curiosity-score

			.state('curiosity-score', {
				url: "/curiosity-score",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/curiosity-score/curiosity_score.html',
						//controller: 'psaController',
						//controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				}
			})
			
			/*.state('bubble-chart', {
				url: "/chart",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/chart/chart.html',
						controller: 'BubbleCtrl',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				}
			})*/

			//email-unsubscribe

			.state('email-unsubscribe', {
				url: "/rockstar/unsubscribe?referrerid",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/email-unsubscribe/email_unsubscribe.html',
						controller: 'emailController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				}
			})

			//job-info
			.state('job-info', {
				url: "/job-info/:jpid",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/job-info/job_info.html',
						controller: 'JobInfoController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			//Peer page for comments and skills rating
			.state('peer-page-for-comments-and-skill-rating', {
				url: "/peer-comments-and-skill-rating",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/peer-rating-skill/peer_rating.html',
						controller: 'PeerRatingController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})
			//Project info public page
			.state('Project-info-public-page', {
				url: "/project/:projectid",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/project-info/project_info.html',
						controller: 'ProjectInfoController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
				//requireLogin: true
			})
			// page-redirect
			.state('page-redirect', {
				url: "/redirect",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						//templateUrl: 'app/redirect/p',
						controller: 'RedirectController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
				//requireLogin: true
			})

			.state('employer-login', {
				url: "/employer/login",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: "app/login/login.html",
						controller: 'LoginController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			.state('employer-register', {
				url: "/employer/register",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: "app/register/register.html",
						controller: "RegisterController",
						controllerAs: "vm"
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				},
			})

			.state('candidates', {
				url: "/candidates",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: "app/candidates/candidates.html",
						controller: "CandidatesController",
						controllerAs: "vm"
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
					employerLoginRequired: true
				},
			})

			//Mentor info
			.state('mentor-offer', {
				url: "/mentor-offer",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/general/mentor_offer.html',
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				}
			})

			//tpass info
			.state('tpass', {
				url: "/tpass",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/general/tpass.html',
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				}
			})
			
			//feedback info
			.state('feedback', {
				url: "/feedback",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/feedback/feedback.html',
						controller: 'FeedBackController',
						controllerAs: 'vm'
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				}
			})			

			//cpass info
			.state('cpass', {
				url: "/cpass",
				views: {
					'header-view': {
						template: "<page-header></page-header>"
					},
					"container-view@": {
						templateUrl: 'app/general/cpass.html',
					},
					'footer-view': {
						template: "<page-footer></page-footer>"
					},
				}
			});			
		// use the HTML5 History API
		$locationProvider.html5Mode(true);

		$qProvider.errorOnUnhandledRejections(false);
	}

	/**
	 * Run once the App is ready
	 */
	function run($rootScope, $location, Authentication, Global) {
		// console.log('App ready!');
		// Redirect to login if route requires auth and you're not logged in
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
			var loggedIn = Authentication.isUserLoggedIn();
			if (toState.requireLogin && !loggedIn) {
				Global.setToRequestState({
					name: toState.name,
					params: toParams
				})
				setTimeout(() => {
					$location.path('/login');
				})
			}
		});
	}
})();


angular.module('app').filter('strReplace', function () {
	return function (input, from, to) {
		input = input || '';
		from = from || '';
		to = to || '';
		return input.replace(new RegExp(from, 'g'), to);
	};
});


// source: http://bit.ly/2fLO0Az
angular.module('app').filter('nl2br', function ($sce) {
	return function (msg, is_xhtml) {
		var is_xhtml = is_xhtml || true;
		var breakTag = (is_xhtml) ? '<br />' : '<br>';
		var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
		return $sce.trustAsHtml(msg);
	}
});

angular.module('app').filter('convertMonth', function () {
	var monthString = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	return function (monthInt) {
		return monthString[monthInt - 1];
	};
});

// source: https://stackoverflow.com/questions/30207272/capitalize-the-first-letter-of-string-in-angularjs
angular.module('app').filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

/*
 * Mask the email 
 */
angular.module('app').filter('maskEmail', function () {	
	return function (content) {		
		username = content.substring(0, content.indexOf('@'));
		domain = content.substring(content.indexOf('@'), content.length);		
		content = content.substring(0, 3) + '*****'+username.slice(-2)+ domain;
		return content;
	};
});


angular.lowercase = text => text.toLowerCase();