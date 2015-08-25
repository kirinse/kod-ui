seajs.config({
    base: "./js/",
    plugins: ['shim'],
    alias: {
        angular: "lib/angular",
        $:"lib/zepto",
        ngGrid:"plugin/ng-grid",
        ngUIRonter:'plugin/angular-ui-router',
        app:'app/app'
    }
});


define(function(require, exports, module) {
alert();
})

