$(function () {

    var $playerBar = $('#playerBar');
    var $playerThumb = $('#playerThumb');
    var $playerTitle = $('#playerTitle');
    var $playerArtist = $('#playerArtist');
    var $playerTime = $('#playerTime');
    var $playerToggleBtn = $('#playerToggleBtn');
    var $playerToggleIcon = $('#playerToggleIcon');
    var $playerCloseBtn = $('#playerCloseBtn');
    var $playerProgressBar = $('#playerProgressBar');

    var isPlaying = false;
    var currentSec = 0;
    var totalSec = 0;
    var timerId = null;

    // "mm:ss" 형식 문자열을 초 단위로 변환
    function timeToSec(timeStr) {
        var parts = timeStr.split(':');
        return (parseInt(parts[0], 10) * 60) + parseInt(parts[1], 10);
    }

    // 초 단위 숫자를 "mm:ss" 형식 문자열로 변환
    function secToTime(sec) {
        var m = Math.floor(sec / 60);
        var s = sec % 60;
        return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
    }

    // 재생 시간 + 진행바 갱신
    function updateProgress() {
        $playerTime.text(secToTime(currentSec) + ' / ' + secToTime(totalSec));
        var percent = totalSec > 0 ? (currentSec / totalSec) * 100 : 0;
        $playerProgressBar.css('width', percent + '%');
    }

    // 1초마다 재생 시간 증가
    function startTimer() {
        stopTimer();
        timerId = setInterval(function () {
            if (currentSec < totalSec) {
                currentSec++;
                updateProgress();
            } else {
                stopTimer();
                isPlaying = false;
                $('#iconStop').hide(); $('#iconPlay').show();
            }
        }, 1000);
    }

    function stopTimer() {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        }
    }

    // 재생바에 곡 정보 표시 + 표시
    function playTrack($item) {
        var title = $item.data('title');
        var artist = $item.data('artist');
        var thumb = $item.data('thumb');
        var time = $item.data('time') || '00:00';

        $playerThumb.attr('src', thumb);
        $playerThumb.attr('alt', title);
        $playerTitle.text(title);
        $playerArtist.text(artist);

        currentSec = 0;
        totalSec = timeToSec(time);
        updateProgress();

        $playerBar.addClass('show');

        isPlaying = true;
        $('#iconPlay').hide(); $('#iconStop').show();
        startTimer();
    }

    // TOP100 리스트 클릭 시 재생
    $(document).on('click', '.top100-item', function () {
        playTrack($(this));
    });

    // 날씨 추천 트랙 클릭 시 재생
    $(document).on('click', '.weather-track', function () {
        playTrack($(this));
    });

    // 날씨 트랙의 개별 재생 버튼은 재생바 토글과 별개로 동작(상위 클릭 전파 방지)
    $(document).on('click', '.weather-play-btn', function (e) {
        e.stopPropagation();
        playTrack($(this).closest('.weather-track'));
    });

    // 최신앨범 / AI추천 - 썸네일 이미지(또는 오버레이) 클릭 시 재생
    // (AI 추천 새로고침 등으로 DOM이 새로 그려져도 동작하도록 document에 위임)
    $(document).on('click', '.album-thumb, .album-overlay', function (e) {
        e.stopPropagation();
        playTrack($(this).closest('.album-card'));
    });

    // album-title, album-artist 등 텍스트 클릭은 막지 않음(서브 페이지 이동 유지)

    // 재생/일시정지 토글
    $playerToggleBtn.on('click', function () {
        isPlaying = !isPlaying;
        if (isPlaying) {
            $('#iconPlay').hide(); $('#iconStop').show();
            startTimer();
        } else {
            $('#iconStop').hide(); $('#iconPlay').show();
            stopTimer();
        }
    });

    // 재생바 닫기
    $playerCloseBtn.on('click', function () {
        $playerBar.removeClass('show');
        isPlaying = false;
        stopTimer();
        currentSec = 0;
        $playerProgressBar.css('width', '0%');
    });

});
