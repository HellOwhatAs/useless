/*!
 * Howler.js Audio Player Demo
 * howlerjs.com
 *
 * (c) 2013-2020, James Simpson of GoldFire Studios
 * goldfirestudios.com
 *
 * MIT License
 */
var elms = ['track', 'timer', 'duration', 'playBtn', 'pauseBtn', 'prevBtn', 'nextBtn', 'playlistBtn', 'volumeBtn', 'progress', 'bar', 'wave', 'loading', 'playlist', 'list', 'volume', 'barEmpty', 'barFull', 'sliderBtn'];
elms.forEach(function(elm) {
    window[elm] = document.getElementById(elm);
});
var Player = function(playlist) {
    this.playlist = playlist;
    this.index = 0;
    track.innerHTML = '1. ' + playlist[0].title;
    playlist.forEach(function(song) {
        var div = document.createElement('div');
        div.className = 'list-song';
        div.innerHTML = song.title;
        div.onclick = function() {
            player.skipTo(playlist.indexOf(song));
        };
        list.appendChild(div);
    });
};
Player.prototype = {
    play: function(index) {
        var self = this;
        var sound;
        index = typeof index === 'number' ? index : self.index;
        var data = self.playlist[index];
        if (data.howl) {
            sound = data.howl;
        } else {
            sound = data.howl = new Howl({
                // src: ['./audio/' + data.file + '.webm', './audio/' + data.file + '.mp3'],
                src: [data.file],
                html5: true,
                onplay: function() {
                    duration.innerHTML = self.formatTime(Math.round(sound.duration()));
                    requestAnimationFrame(self.step.bind(self));
                    wave.container.style.display = 'block';
                    bar.style.display = 'none';
                    pauseBtn.style.display = 'block';
                },
                onload: function() {
                    wave.container.style.display = 'block';
                    bar.style.display = 'none';
                    loading.style.display = 'none';
                },
                onend: function() {
                    wave.container.style.display = 'none';
                    bar.style.display = 'block';
                    self.skip('next');
                },
                onpause: function() {
                    wave.container.style.display = 'none';
                    bar.style.display = 'block';
                },
                onstop: function() {
                    wave.container.style.display = 'none';
                    bar.style.display = 'block';
                },
                onseek: function() {
                    requestAnimationFrame(self.step.bind(self));
                }
            });
        }
        sound.play();
        track.innerHTML = (index + 1) + '. ' + data.title;
        if (sound.state() === 'loaded') {
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'block';
        } else {
            loading.style.display = 'block';
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'none';
        }
        self.index = index;
    },
    pause: function() {
        var self = this;
        var sound = self.playlist[self.index].howl;
        sound.pause();
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
    },
    skip: function(direction) {
        var self = this;
        var index = 0;
        if (direction === 'prev') {
            index = self.index - 1;
            if (index < 0) {
                index = self.playlist.length - 1;
            }
        } else {
            index = self.index + 1;
            if (index >= self.playlist.length) {
                index = 0;
            }
        }
        self.skipTo(index);
    },
    skipTo: function(index) {
        var self = this;
        if (self.playlist[self.index].howl) {
            self.playlist[self.index].howl.stop();
        }
        progress.style.width = '0%';
        self.play(index);
    },
    volume: function(val) {
        var self = this;
        Howler.volume(val);
        var barWidth = (val * 90) / 100;
        barFull.style.width = (barWidth * 100) + '%';
        sliderBtn.style.left = (window.innerWidth * barWidth + window.innerWidth * 0.05 - 25) + 'px';
    },
    seek: function(per) {
        var self = this;
        var sound = self.playlist[self.index].howl;
        if (sound.playing()) {
            sound.seek(sound.duration() * per);
        }
    },
    step: function() {
        var self = this;
        var sound = self.playlist[self.index].howl;
        var seek = sound.seek() || 0;
        timer.innerHTML = self.formatTime(Math.round(seek));
        progress.style.width = (((seek / sound.duration()) * 100) || 0) + '%';
        if (sound.playing()) {
            requestAnimationFrame(self.step.bind(self));
        }
    },
    togglePlaylist: function() {
        var self = this;
        var display = (playlist.style.display === 'block') ? 'none' : 'block';
        setTimeout(function() {
            playlist.style.display = display;
        }, (display === 'block') ? 0 : 500);
        playlist.className = (display === 'block') ? 'fadein' : 'fadeout';
    },
    toggleVolume: function() {
        var self = this;
        var display = (volume.style.display === 'block') ? 'none' : 'block';
        setTimeout(function() {
            volume.style.display = display;
        }, (display === 'block') ? 0 : 500);
        volume.className = (display === 'block') ? 'fadein' : 'fadeout';
    },
    formatTime: function(secs) {
        var minutes = Math.floor(secs / 60) || 0;
        var seconds = (secs - minutes * 60) || 0;
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }
};
var player = new Player([{
    title: '1n,PianoPrinceOfAnime - かたわれ時(黄昏之时) Remix',
    file: '0.mp3',
    howl: null
},{
    title: 'Altan - Daily Growing',
    file: '1.mp3',
    howl: null
},{
    title: 'Bandari - 追梦人',     
    file: '2.mp3',
    howl: null
},{
    title: 'CMA - Forgive Me',     
    file: '3.mp3',
    howl: null
},{
    title: 'EGOIST - Euterpe',
    file: '5.mp3',
    howl: null
},{
    title: 'Michael Learns To Rock - Take Me To Your Heart',
    file: '7.mp3',
    howl: null
},{
    title: 'RADWIMPS - なんでもないや (movie ver.)',
    file: '9.mp3',
    howl: null
},{
    title: 'RADWIMPS - 前前前世 (movie ver.)',
    file: '10.mp3',
    howl: null
},{
    title: 'RADWIMPS - 口噛み酒トリップ',
    file: '11.mp3',
    howl: null
},{
    title: 'RADWIMPS - 御神体',
    file: '12.mp3',
    howl: null
},{
    title: 'RADWIMPS - 御神体へ再び',
    file: '13.mp3',
    howl: null
},{
    title: 'RADWIMPS - 記憶を呼び起こす瀧',
    file: '14.mp3',
    howl: null
},{
    title: 'Senpai Kondor - Tomorrow With You',
    file: '15.mp3',
    howl: null
},{
    title: 'TFBOYS - 爱',
    file: '17.mp3',
    howl: null
},{
    title: 'Trazer Lightscape - Awake',
    file: '18.mp3',
    howl: null
},{
    title: 'V.K克 - 蝶梦花雾雨',
    file: '19.mp3',
    howl: null
},{
    title: 'スパークル-[火花](Movie_Ver_)-(动画电影《你的名字。》插曲)-RADWIMPS',
    file: '22.mp3',
    howl: null
},{
    title: '冯文甜 - 会孤单',
    file: '25.mp3',
    howl: null
},{
    title: '刁立博 - 我想（Cover：张杰）',
    file: '26.mp3',
    howl: null
},{
    title: '司夏 - 与你最后的夏天',
    file: '29.mp3',
    howl: null
},{
    title: '夢灯籠-(动画电影《你的名字。》片头曲)-RADWIMPS',
    file: '31.mp3',
    howl: null
},{
    title: '天上人间-Bandari',
    file: '32.mp3',
    howl: null
},{
    title: '女声 - 小小的太阳',
    file: '33.mp3',
    howl: null
},{
    title: '容祖儿,周晓鸥,蔡卓妍 - 崛起',
    file: '34.mp3',
    howl: null
},{
    title: '山海入梦来',
    file: '36.mp3',
    howl: null
},{
    title: '张宇 - 月亮惹的祸',
    file: '38.mp3',
    howl: null
},{
    title: '张杰 - Give You My World',
    file: '39.mp3',
    howl: null
},{
    title: '张杰 - 他不懂',
    file: '40.mp3',
    howl: null
},{
    title: '悬溺',
    file: '41.m4a',
    howl: null
},{
    title: '方便便 - 《从你的全世界路过》纯音乐插曲-开往春天的地铁',
    file: '43.mp3',
    howl: null
},{
    title: '时间煮雨-(电影《小时代》主题曲)-郁可唯-3372383',
    file: '44.aac',
    howl: null
},{
    title: '月蝕,河图 - 丹心鉴',
    file: '45.mp3',
    howl: null
},{
    title: '李玉刚 - 刚好遇见你',
    file: '46.mp3',
    howl: null
},{
    title: '李翊君 - 雨蝶',
    file: '47.mp3',
    howl: null
},{
    title: '杨坤 郭采洁 - 答案',
    file: '48.mp3',
    howl: null
},{
    title: '林俊杰 - 冻结',
    file: '49.mp3',
    howl: null
},{
    title: '河图 - 两生契',
    file: '50.mp3',
    howl: null
},{
    title: '河图 - 为龙',
    file: '51.mp3',
    howl: null
},{
    title: '河图 - 墨宝 古龙群侠传',
    file: '52.mp3',
    howl: null
},{
    title: '河图 - 老酒街',
    file: '53.mp3',
    howl: null
},{
    title: '河图 - 藏海花·天葬·三日静寂',
    file: '54.mp3',
    howl: null
},{
    title: '河图 - 越人歌',
    file: '55.mp3',
    howl: null
},{
    title: '灯火-(电影《毛驴县令》主题歌)-潘长江',
    file: '56.mp3',
    howl: null
},{
    title: '班得瑞 - Your Smile',
    file: '57.mp3',
    howl: null
},{
    title: '红尘客栈-周杰伦',
    file: '58.mp3',
    howl: null
},{
    title: '许嵩 - 伴虎',
    file: '59.mp3',
    howl: null
},{
    title: '许嵩 - 千百度',
    file: '60.mp3',
    howl: null
},{
    title: '许嵩 - 半城烟沙',
    file: '61.mp3',
    howl: null
},{
    title: '许嵩 - 坏孩子',
    file: '62.mp3',
    howl: null
},{
    title: '许嵩 - 多余的解释',
    file: '63.mp3',
    howl: null
},{
    title: '许嵩 - 天龙八部之宿敌',
    file: '64.mp3',
    howl: null
},{
    title: '许嵩 - 幻胖',
    file: '65.mp3',
    howl: null
},{
    title: '许嵩 - 庐州月',
    file: '66.mp3',
    howl: null
},{
    title: '许嵩 - 弹指一挥间',
    file: '67.mp3',
    howl: null
},{
    title: '许嵩 - 拆东墙',
    file: '68.mp3',
    howl: null
},{
    title: '许嵩 - 断桥残雪',
    file: '69.mp3',
    howl: null
},{
    title: '许嵩 - 星座书上',
    file: '70.mp3',
    howl: null
},{
    title: '许嵩 - 梧桐灯',
    file: '71.mp3',
    howl: null
},{
    title: '许嵩 - 清明雨上',
    file: '72.mp3',
    howl: null
},{
    title: '许嵩 - 通关',
    file: '73.mp3',
    howl: null
},{
    title: '许嵩,洛天依 - 深夜书店',
    file: '74.mp3',
    howl: null
},{
    title: '许巍 - 蓝莲花',
    file: '75.mp3',
    howl: null
},{
    title: '谢娜,张杰 - 天下',
    file: '76.mp3',
    howl: null
},{
    title: '逃跑计划 - 夜空中最亮的星',
    file: '78.mp3',
    howl: null
},{
    title: '潮汐',
    file: '79.mp3',
    howl: null
},]);
playBtn.addEventListener('click', function() {
    player.play();
});
pauseBtn.addEventListener('click', function() {
    player.pause();
});
prevBtn.addEventListener('click', function() {
    player.skip('prev');
});
nextBtn.addEventListener('click', function() {
    player.skip('next');
});
waveform.addEventListener('click', function(event) {
    player.seek(event.clientX / window.innerWidth);
});
playlistBtn.addEventListener('click', function() {
    player.togglePlaylist();
});
playlist.addEventListener('click', function() {
    player.togglePlaylist();
});
volumeBtn.addEventListener('click', function() {
    player.toggleVolume();
});
volume.addEventListener('click', function() {
    player.toggleVolume();
});
barEmpty.addEventListener('click', function(event) {
    var per = event.layerX / parseFloat(barEmpty.scrollWidth);
    player.volume(per);
});
sliderBtn.addEventListener('mousedown', function() {
    window.sliderDown = true;
});
sliderBtn.addEventListener('touchstart', function() {
    window.sliderDown = true;
});
volume.addEventListener('mouseup', function() {
    window.sliderDown = false;
});
volume.addEventListener('touchend', function() {
    window.sliderDown = false;
});
var move = function(event) {
    if (window.sliderDown) {
        var x = event.clientX || event.touches[0].clientX;
        var startX = window.innerWidth * 0.05;
        var layerX = x - startX;
        var per = Math.min(1, Math.max(0, layerX / parseFloat(barEmpty.scrollWidth)));
        player.volume(per);
    }
};
volume.addEventListener('mousemove', move);
volume.addEventListener('touchmove', move);
var wave = new SiriWave({
    container: waveform,
    width: window.innerWidth,
    height: window.innerHeight * 0.3,
    cover: true,
    speed: 0.03,
    amplitude: 0.7,
    frequency: 2
});
wave.start();
var resize = function() {
    var height = window.innerHeight * 0.3;
    var width = window.innerWidth;
    wave.height = height;
    wave.height_2 = height / 2;
    wave.MAX = wave.height_2 - 4;
    wave.width = width;
    wave.width_2 = width / 2;
    wave.width_4 = width / 4;
    wave.canvas.height = height;
    wave.canvas.width = width;
    wave.container.style.margin = -(height / 2) + 'px auto';
    var sound = player.playlist[player.index].howl;
    if (sound) {
        var vol = sound.volume();
        var barWidth = (vol * 0.9);
        sliderBtn.style.left = (window.innerWidth * barWidth + window.innerWidth * 0.05 - 25) + 'px';
    }
};
window.addEventListener('resize', resize);
resize();
