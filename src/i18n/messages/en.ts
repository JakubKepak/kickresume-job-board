const en: Record<string, string> = {
  // App
  'app.pageTitle.withQuery': 'Results for {query} jobs',
  'app.pageTitle.default': 'Job Search',
  'app.detail.placeholder': 'Select a job to view details',

  // SearchBar
  'search.placeholder': 'Job title, keyword, or company',
  'search.submit': 'Search',
  'search.clear': 'Clear search',

  // CountrySelect
  'country.all': 'All countries',
  'country.filterLabel': 'Filter by country',

  // JobList
  'jobList.resultCount': '{count, plural, one {# search result} other {# search results}}',
  'jobList.noMore': 'No more results',
  'jobList.empty': 'No jobs found. Try a different search.',

  // JobDetail
  'jobDetail.apply': 'Apply',
  'jobDetail.applyNow': 'Apply Now',
  'jobDetail.back': 'Back',

  // ErrorFallback
  'error.404.title': 'Job vanished into thin air',
  'error.404.description': 'This job listing pulled a disappearing act. It may have been filled or removed.',
  'error.404.button': 'Back to search',
  'error.5xx.title': 'Our servers are taking a coffee break',
  'error.5xx.description': 'They should be back shortly. In the meantime, maybe perfect your resume?',
  'error.5xx.button': 'Try again',
  'error.api.title': 'Houston, we have a problem',
  'error.api.description': 'Something went wrong fetching the data. Check your connection and give it another shot.',
  'error.api.button': 'Retry',
  'error.network.title': 'Lost in the internet wilderness',
  'error.network.description': "We can't reach the server. Make sure you're connected to the internet and try again.",
  'error.network.button': 'Reconnect',
  'error.unknown.title': "Well, that wasn't supposed to happen",
  'error.unknown.description': 'Something unexpected went wrong. Our bad — give it another try.',
  'error.unknown.button': 'Try again',

  // LoadingSpinner
  'loading.label': 'Loading',

  // Format utilities
  'time.justNow': 'Just now',
  'time.minutesAgo': '{count, plural, one {# minute ago} other {# minutes ago}}',
  'time.hoursAgo': '{count, plural, one {# hour ago} other {# hours ago}}',
  'time.daysAgo': 'Posted {count, plural, one {# day ago} other {# days ago}}',
  'time.overWeekAgo': 'Posted over a week ago',

  // Work arrangement
  'workArrangement.on-site': 'On-site',
  'workArrangement.hybrid': 'Hybrid',
  'workArrangement.remote': 'Remote',
}

export default en
