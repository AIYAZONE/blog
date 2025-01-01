const headConf = require('./config/head-conf');
const themeConf = require('./config/theme-conf');
const pluginConf = require('./config/plugin-conf');

module.exports = {
	title: 'AIYA领域',
	description: '路漫漫其修远兮，吾将上下而求索。',
	head: headConf,
	dest: './dist',
	themeConfig: themeConf,
	plugins: pluginConf,
	ga: '',
	evergreen: true,
	markdown: {
		lineNumbers: true,
		extendMarkdown: (md) => {
			md.use(require('markdown-it-task-lists'));
		}
	}
};
