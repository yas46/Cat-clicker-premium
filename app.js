(function () {
    'use strict';

    var model = {
        currentCat: null,
        cats: [
            {
                clickCount: 0,
                name: "Tom",
                url: "https://c2.staticflickr.com/2/1557/25135549306_b671c01053_z.jpg"
            },
            {
                clickCount: 0,
                name: "Felix",
                url: "https://c2.staticflickr.com/6/5482/11637643254_8d7d8f4b48_z.jpg"
            },
            {
                clickCount: 0,
                name: "Garfield",
                url: "https://c1.staticflickr.com/9/8501/8300920648_d4a21bba59.jpg"
            },
            {
                clickCount: 0,
                name: "Alley",
                url: "https://c1.staticflickr.com/3/2386/1696417701_2ba5cda00c.jpg"
            },
            {
                clickCount: 0,
                name: "Sue",
                url: "https://c2.staticflickr.com/4/3360/3591850431_4599f509e2.jpg"
            }
        ],
        adminBoxVisible: false,
        photoClicked: false
    };

    var catView = {
        init: function () {
            this.cat = document.getElementById('cat-box');
            this.catName = document.getElementById('cat-name');
            this.clickCount  = document.getElementById('click-count');
            this.catPhoto = document.getElementById('cat-photo');
            this.adminBtn = document.getElementById('admin-btn');

            this.catPhoto.addEventListener('click', function(e) {
                controller.incrementClickCount();
            });

            this.render();
        },
        render: function () {
            var currentCat = controller.getCurrentCat();
            this.catName.textContent = currentCat.name;
            this.clickCount.textContent = currentCat.clickCount;
            this.catPhoto.src = currentCat.url;

            if(model.photoClicked === true) {
                this.catPhoto.className = "photo-click";
                setTimeout(function() {
                    catView.catPhoto.className = "cat-photo";
                    model.photoClicked = false;
                }, 70);
            }

            this.adminBtn.addEventListener('click', function() {
                controller.showAdminBox();
            });
        }
    };

    var listView = {
        init: function() {
            this.ul = document.getElementById('cat-list');
            this.render();
        },
        render: function() {
            this.ul.innerHTML = '';
            var cats = controller.getCats();
            for (var i = 0; i < cats.length; i++) {
                var cat = cats[i];
                var li = document.createElement('li');
                li.textContent = cat.name;
                li.addEventListener('click', (function(cat) {
                    return function() {
                            controller.setCurrentCat(cat);
                            catView.render();
                        };
                })(cat));
                this.ul.appendChild(li);
            };
        }
    };

    var adminView = {
        init: function () {
            this.adminBox = document.getElementById('admin-box');
            this.adminCancelBtn = document.getElementById('cancel-btn');
            this.adminSaveBtn = document.getElementById('save-btn');

            this.adminCancelBtn.addEventListener('click', function() {
                controller.hideAdminBox();
            });

            this.adminSaveBtn.addEventListener('click', function() {
                var nameInputValue = document.getElementById('name-input').value;
                var urlInputValue = document.getElementById('url-input').value;
                var clicksInputValue = document.getElementById('clicks-input').value;
                console.log(nameInputValue);
                controller.saveAdminInput(nameInputValue, urlInputValue, clicksInputValue);
            });

            this.render();
        },
        render: function () {
            if (model.adminBoxVisible === true) {
                this.adminBox.style.display = "block";
            } else {
                this.adminBox.style.display = "none";
            }
            document.getElementById('name-input').value = "";
            document.getElementById('url-input').value = "";
            document.getElementById('clicks-input').value = "";
        },
    };

    var controller = {
        init: function(){
            model.currentCat = model.cats[0];
            listView.init();
            catView.init();
            adminView.init();
        },

        getCurrentCat: function() {
            return model.currentCat;
        },

        setCurrentCat: function(cat){
            model.currentCat = cat;
        },

        getCats: function(){
            return model.cats;
        },

        incrementClickCount: function(){
            model.currentCat.clickCount++;
            model.photoClicked = true;
            catView.render();
        },

        hideAdminBox: function () {
            model.adminBoxVisible = false;
            adminView.render();
        },

        showAdminBox: function () {
            model.adminBoxVisible = true;
            adminView.render();
        },

        saveAdminInput: function (name, url, clicks) {
            if (name != "") {
                model.currentCat.name = name;
            }
            if (url != "") {
                model.currentCat.url = url;
            }
            if (clicks != "") {
                model.currentCat.clickCount = clicks;
            }
            catView.render();
            listView.render();
            this.hideAdminBox();
        }


    };

    controller.init();

})();
