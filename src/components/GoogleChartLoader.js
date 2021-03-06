// GoogleChartLoader Singleton

// Based on http://blog.arkency.com/2014/09/react-dot-js-and-google-charts/

import Promise from 'bluebird';
import Debug from 'debug';

const debug = new Debug('react-google-charts:GoogleChartLoader');
const script = typeof window !== 'undefined' ? require('scriptjs') : (link, callback) => callback();

const googleChartLoader = {
  isLoaded: false,
  isLoading: false,
  initPromise: {},
  init: function init(packages, version) {
    debug('init', packages, version);
    if (this.isLoading || this.isLoaded) {
      return this.initPromise;
    }
    this.isLoading = true;
    this.initPromise = new Promise((resolve) => {
      script('https://www.gstatic.com/charts/loader.js', () => {
        window.google.charts.load(version || 'current', { packages: packages || ['corechart'] });
        window.google.charts.setOnLoadCallback(() => {
          debug('Chart Loaded');
          this.isLoaded = true;
          this.isLoading = false;
          resolve();
        });
      });
    });
    return this.initPromise;
  },
};

export default googleChartLoader;
