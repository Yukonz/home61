(function ($){

    var defaults = {
        color:['green'],
        time: 1000
    };

    var timerData = {
        initialColor: null,
        object: null,
        colorsCount: null,
        startCycle: false,
        stopCycle: false,
        timerRunning: false
    };

    var options;
    var colorTimer;

    var methods = {
        setColor: function(){setColor();},
        changeColor: function(){changeColor();},
        unsetColor: function(){unsetColor();},
        startCycle: function(){startCycle();},
        stopCycle: function(){stopCycle();}
    };

    $.fn.colorize = function (method, params) {
        options = $.extend({}, defaults, options, params);
        timerData.object = $(this);

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else return methods.setColor.apply(this, arguments);

    };

    function setColor()
    {
        timerData.colorsCount = options.color.length;
        timerData.initialColor = $(timerData.object).css('color');

        var i=0;
        colorTimer = setInterval(function(){
            timerData.timerRunning = true;
            $(timerData.object).css('color', options.color[i]);
            i++;
            if (i === timerData.colorsCount){
                if(timerData.startCycle === true){
                    i=0;
                } else {
                    clearInterval(colorTimer);
                    timerData.timerRunning = false;
                }
            }
        }, options.time);
        return timerData.object;
    }

    function unsetColor()
    {
        clearInterval(colorTimer);
        timerData.startCycle = false;
        $(timerData.object).css('color', timerData.initialColor);
        return timerData.object;
    }

    function startCycle()
    {
        if (timerData.timerRunning === true) {
            timerData.startCycle = true;

        }
        return timerData.object;
    }

    function stopCycle()
    {
        timerData.startCycle = false;
        return timerData.object;
    }

    function changeColor()
    {
        if (timerData.timerRunning === true) {
            clearInterval(colorTimer);
            setColor();
        }
        return timerData.object;
    }

}( jQuery ));