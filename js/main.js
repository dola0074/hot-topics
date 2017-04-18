/* global, $, console, alert, confirm, prompt */
$(document).ready(function () {
    'use strict';
    var content, url, i;
    content = {};
    $(".main-content").load("./partials/home.html", function (response) {
        content["./partials/home.html"] = response;
    });
    // console.log(content);
    function loadContent(urlParam) {
        if (content[urlParam]) {
            //load array content
            $(".main-content").html(content[urlParam]);
            console.log("content has been loaded from array");
        } else {
            // load by ajax
            $(".main-content").load(urlParam, function (response) {
                content[urlParam] = response;
                // console.log("added to content with ajax");
            });
        }
    }
    $("nav a").on("click", function (ev) {
        ev.preventDefault();
        url = $(this).attr("href");
        loadContent(url);
        $(".main-content").on("submit", "form", handleForm);
    });
    /* handle-form */
    function handleSuccess(response) {
        $(".feedback").html(response);
        $("form").each(function () {
            this.reset();
        });
    }

    function handleError(jqXHR, textStatus, errorThrown) {
        console.log("textStatus: " + textStatus + "\n" + "errorThrown: " + errorThrown);
    }

    function handleForm(ev) {
        ev.preventDefault();
        var err, dt, fn, em, subject, comments, feedback;
        dt = {};
        err = [];
        fn = $.trim($("#fn").val());
        em = $.trim($("#em").val());
        subject = $.trim($("#subject").val());
        comments = $.trim($("#comments").val());
        if (fn !== "") {
            dt.fn = fn;
        } else {
            err.push("Please enter your name! ");
        }
        if (em !== "") {
            dt.em = em;
        } else {
            err.push("Please enter your E-Mail! ");
        }
        if (subject !== "") {
            dt.subject = subject;
        } else {
            err.push("Please enter a subject! ");
        }
        if (comments !== "") {
            dt.comments = comments;
        } else {
            err.push("Please enter your comments! ");
        }
        if (err.length === 0) {
            $.ajax({
                type: "post",
                
                url: "./partials/web-service.php",
                
                data: dt,
                
                dataType: "text"
            }).done(handleSuccess).fail(handleError);
        } else {
            $(".feedback").html(err);
            console.log(err);
        }
    }
});