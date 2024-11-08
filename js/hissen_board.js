let url = window.location.href,
    urlPath,
    showContent,
    boardType,
    htmlPath;

if(url.includes('/notice')) {
    urlPath = 'contact';
    boardType = 'table';
    htmlPath = 'notice';
    showContent = 10;
} else if(url.includes('/news')) {
    urlPath = 'media';
    boardType = 'gallery';
    htmlPath = 'news';
    showContent = 6;
} else if(url.includes('/blog')) {
    urlPath = 'media';
    boardType = 'gallery';
    htmlPath = 'blog';
    showContent = 6;
} else if(url.includes('/youtube')) {
    urlPath = 'media';
    boardType = 'video';
    htmlPath = 'youtube';
    showContent = 6;
} else if(url.includes('/magazine')) {
    urlPath = 'media';
    boardType = 'magazine';
    htmlPath = 'magazine';
    showContent = 4;
}


if(!url.includes('_view')) { // 게시판 화면

    //now 클릭 막기
    $(document).on('click', '.page_track .now',function(e) {
        e.preventDefault();
    });

    //페이지 확인
    let page = url.split('page=')[1];

    if(page === undefined) {
        page = 1;
    } else {
        page = Number(page);
    }

    let pageInt = parseInt((page-1) / 5);

    $.ajax({
        type: 'GET',
        url: '/data/yuhancare/inc/json/' + htmlPath + '.json',
        async:false,
        dataType: 'json',
        success: function(data) {
            let content = '',
                pageLink = '';
            if(data.length <= showContent) { //컨텐츠가 한페이지를 못채울 경우
                $.each(data, function(i, obj){
                    if(boardType === 'table') { //테이블 형식
                        content += `<tr><td class="number" data-name="NO">${obj.no}</td><td><a href="/${urlPath}/${htmlPath}_view?key=${obj.no}">${obj.title}</a></td><td class="date">${obj.date}</td></tr>`;
                    } else if(boardType === 'video') { //유튜브링크
                        content += `<a class="context" href="${obj.url}" target="_blank" title="새창"><div class="imgbox link_icon" style="background-image:url(${obj.img});"></div><div class="title">${obj.title}</div></a>`;
                    } else if(boardType === 'magazine') { //매거진링크
                        content += `<a class="context" href="${obj.url}" target="_blank" title="새창"><div class="textbox"><div class="title">${obj.title}</div><div class="subtitle">${obj.subtitle}</div></div><div class="imgbox"><img src="${obj.img}" alt="${obj.title}"></div></a>`;
                    } else if(boardType === 'gallery') { //바둑판 형식
                        content += `<a class="context" href="/${urlPath}/${htmlPath}_view?key=${obj.no}"><div class="imgbox link_icon" style="background-image:url(${obj.img});"></div><div class="title">${obj.title}</div><div class="date">${obj.date}</div></a>`;
                    }
                });
                pageLink = `<a href="/${urlPath}/${htmlPath}?page=1" class="now">1</a>`;

                //이전&다음 페이지 화살표
                $('.page_navi .prev_btn, .page_navi .next_btn, .page_navi .prev_btn5, .page_navi .next_btn5').on('click',function(e) {
                    e.preventDefault();
                });
            } else { //컨텐츠가 한페이지 이상 있는 경우
                let count = (page-1) * showContent,
                    paging = parseInt(data.length / showContent),
                    pagingInt = parseInt(paging / 5);
                if(page > Math.ceil(data.length / showContent)) {
                    window.location.href = '/nothing';
                }
                if(page === paging + 1) { //마지막 페이지
                    let remainder = data.length % showContent;
                    if(boardType === 'table') { //테이블 형식
                        for(var i=count;i<count+remainder;i++) {
                            content += `<tr><td class="number" data-name="NO">${data[i].no}</td><td><a href="/${urlPath}/${htmlPath}_view?key=${data[i].no}">${data[i].title}</a></td><td class="date">${data[i].date}</td></tr>`;
                        }
                    } else if(boardType === 'video') { //유튜브링크
                        for(var i=count;i<count+remainder;i++) {
                            content += `<a class="context" href="${data[i].url}" target="_blank" title="새창"><div class="imgbox link_icon" style="background-image:url(${data[i].img});"></div><div class="title">${data[i].title}</div></a>`;
                        }
                    } else if(boardType === 'magazine') { //매거진링크
                        for(var i=count;i<count+remainder;i++) {
                            content += `<a class="context" href="${data[i].url}" target="_blank" title="새창"><div class="textbox"><div class="title">${data[i].title}</div><div class="subtitle">${data[i].subtitle}</div></div><div class="imgbox"><img src="${data[i].img}" alt="${data[i].title}"></div></a>`;
                        }
                    } else if(boardType === 'gallery') {//바둑판 형식
                        for(var i=count;i<count+remainder;i++) {
                            content += `<a class="context" href="/${urlPath}/${htmlPath}_view?key=${data[i].no}"><div class="imgbox link_icon" style="background-image:url(${data[i].img});"></div><div class="title">${data[i].title}</div><div class="date">${data[i].date}</div></a>`;
                        }
                    }
                } else { //마지막 페이지가 아닐때
                    if(boardType === 'table') { //테이블 형식
                        for(var i=count;i<count+showContent;i++) {
                            content += `<tr><td class="number" data-name="NO">${data[i].no}</td><td><a href="/${urlPath}/${htmlPath}_view?key=${data[i].no}">${data[i].title}</a></td><td class="date">${data[i].date}</td></tr>`;
                        }
                    } else if(boardType === 'video') { //유튜브링크
                        for(var i=count;i<count+showContent;i++) {
                            content += `<a class="context" href="${data[i].url}" target="_blank" title="새창"><div class="imgbox link_icon" style="background-image:url(${data[i].img});"></div><div class="title">${data[i].title}</div></a>`;
                        }
                    } else if(boardType === 'magazine') { //매거진링크
                        for(var i=count;i<count+showContent;i++) {
                            content += `<a class="context" href="${data[i].url}" target="_blank" title="새창"><div class="textbox"><div class="title">${data[i].title}</div><div class="subtitle">${data[i].subtitle}</div></div><div class="imgbox"><img src="${data[i].img}" alt="${data[i].title}"></div></a>`;
                        }
                    } else if(boardType === 'gallery') {
                        //바둑판 형식
                        for(var i=count;i<count+showContent;i++) {
                            content += `<a class="context" href="/${urlPath}/${htmlPath}_view?key=${data[i].no}"><div class="imgbox link_icon" style="background-image:url(${data[i].img});"></div><div class="title">${data[i].title}</div><div class="date">${data[i].date}</div></a>`;
                        }
                    }
                }

                let trackStart, trackEnd;
                let boardUrl = location.href.split('?')[0];
                if(pageInt < 1) { //현재 페이지가 5 이하인 경우
                    trackStart = 1;
                    if(paging < 5) {
                        trackEnd = (data.length%showContent) == 0 ? paging : paging + 1;
                    } else {
                        trackEnd = 5;
                    }
                    $('.page_navi .prev_btn5').on('click',(e) => e.preventDefault());
                    if(page <= (pagingInt+1)*5 && page > pagingInt*5) {
                        $('.page_navi .next_btn5').on('click',(e) => e.preventDefault());
                    } else {
                        $('.page_navi .next_btn5').attr('href',`${boardUrl}?page=${trackStart+5}`);
                    }
                } else { //현재 페이지가 6 이상인 경우
                    trackStart = (pageInt*5)+1;
                    if(page <= (pagingInt+1)*5 && page > pagingInt*5) { //마지막 페이지가 존재하는 트랙인 경우
                        trackEnd = (data.length%showContent) == 0 ? paging : paging + 1;
                        $('.page_navi .prev_btn5').attr('href',`${boardUrl}?page=${trackStart-5}`);
                        $('.page_navi .next_btn5').on('click',(e) => e.preventDefault());
                    } else { //마지막 페이지가 존재하지 않는 트랙인 경우
                        trackEnd = (pageInt+1)*5;
                        $('.page_navi .prev_btn5').attr('href',`${boardUrl}?page=${trackStart-5}`);
                        $('.page_navi .next_btn5').attr('href',`${boardUrl}?page=${trackStart+5}`);
                    }
                }
                for(var j=trackStart;j<=trackEnd;j++) {
                    if(j === page) {
                        pageLink += `<a href="${boardUrl}?page=${j}" class="now">${j}</a>`;
                    } else {
                        pageLink += `<a href="${boardUrl}?page=${j}">${j}</a>`;
                    }
                }

                //이전&다음 페이지 화살표
                if(page === 1) {
                    $('.page_navi .prev_btn').on('click',(e) => e.preventDefault());
                } else {
                    $('.page_navi .prev_btn').attr('href',`${boardUrl}?page=${page-1}`);
                }
                if(page === paging + 1) {
                    $('.page_navi .next_btn').on('click',(e) => e.preventDefault());
                } else {
                    $('.page_navi .next_btn').attr('href',`${boardUrl}?page=${page+1}`);
                }
            }

            $('.board_wrap .total span').text(data.length);
            $('.page_track').html(pageLink);
            if(boardType === 'table') {
                $('.board_wrap .table tbody').html(content);
            } else if(boardType === 'magazine') {
                $('.board_wrap .magazine_list').html(content);
            } else {
                $('.board_wrap .thumnail_box').html(content);

                //제목 축약
                if(window.innerWidth > 1000) {
                    $('.thumnail_box .context .title').each(function() {
                        if($(this).text().length > 40) {
                            $(this).text($(this).text().substr(0,36) + '...');
                        }
                    });
                } else {
                    $('.thumnail_box .context .title').each(function() {
                        if($(this).text().length > 20) {
                            $(this).text($(this).text().substr(0,20) + '...');
                        }
                    });
                }
            }
        },
        error: function() {
            if(htmlPath === 'notice') {
                $('.board_wrap .table tbody').html('<tr><td colspan="3">게시글이 없습니다.</td></tr>');
            } else {
                $('.board_wrap .thumnail_box').html('<p class="nothing">게시글이 없습니다.</p>');
            }
        }
    });

} else { //게시글 화면
    const nowUrl = new URL(location.href);
    const key = nowUrl.searchParams.get('key');

    $.ajax({
        type: 'GET',
        url: '/data/yuhancare/' + urlPath + '/' + htmlPath + '_contents/' + key + '.html',
        async:false,
        success: function(data) {
            $('#board_content').append(data);
        },
        error: function() {
            window.location.href = '/nothing';
        }
    });

    $.ajax({
        type: 'GET',
        url: '/data/yuhancare/inc/json/' + htmlPath + '.json',
        async:false,
        dataType: 'json',
        success: function(data) {
            let nowContent = data.length - key;
            if(nowContent < 1) {
                if(key === 1 ) {
                    $('a.next').text('다음글이 없습니다').on('click',(e) => e.preventDefault()).addClass('disabled');
                    $('a.prev').text('이전글이 없습니다').on('click',(e) => e.preventDefault()).addClass('disabled');
                } else {
                    $('a.next').text('다음글이 없습니다').on('click',(e) => e.preventDefault()).addClass('disabled');
                    $('a.prev').text(data[nowContent + 1].title).attr('href',`/${urlPath}/${htmlPath}_view?key=${key - 1}`).siblings('span.date').text(data[nowContent + 1].date);
                }
            } else if(key === 1) {
                $('a.next').text(data[nowContent - 1].title).attr('href',`/${urlPath}/${htmlPath}_view?key=${key + 1}`).siblings('span.date').text(data[nowContent - 1].date);
                $('a.prev').text('이전글이 없습니다').on('click',(e) => e.preventDefault()).addClass('disabled');
            } else {
                $('a.next').text(data[nowContent - 1].title).attr('href',`/${urlPath}/${htmlPath}_view?key=${key + 1}`).siblings('span.date').text(data[nowContent - 1].date);
                $('a.prev').text(data[nowContent + 1].title).attr('href',`/${urlPath}/${htmlPath}_view?key=${key - 1}`).siblings('span.date').text(data[nowContent + 1].date);
            }
        }
    });
}