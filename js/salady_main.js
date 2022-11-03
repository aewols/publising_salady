$(document).ready(function(){

    
    $(".event_btn").click(function(){
        $(this).hide();
        $(".event").show().animate({"width":"450px"})
        $(".event_btn_close").show();
    });
    $(".event_btn_close").click(function(){
        $(this).hide();
        $(".event").animate({"width":"0"})
        $(".event_btn").show();
    });

    var event_w=$(".event_contents li").width(); 
    var event_n=$(".event_contents li").length;
    var event_oldidx=0; 
    var event_index=0; 

    function slideEvent(event_index){

        eventX=-(event_index*event_w);

        $(".event_contents").animate({left:eventX},400)
        $(".event_slide_bar li").eq(event_oldidx).removeClass("event_on"); 
        $(".event_slide_bar li").eq(event_index).addClass("event_on"); 

        event_oldidx=event_index;
    }


    $(".event_slide_bar li").click(function(){

        event_index=$(this).index();
        slideEvent(event_index);

    })






	$(".gnbMenu>li").hover(function(){
		$(this).find("a>span").css({"opacity":"1"})
        $(this).find(">ul").stop(true,true).slideDown();
    },function(){
    	$(this).find("a>span").css({"opacity":"0"})
        $(this).find(">ul").stop(true,true).slideUp();
    });





    var img_w= $(".slide ul li").width();   //이미지의 가로너비
    var simg_n= $(".slide ul li").length;  //이미지의 총개수  
    var soldidx=0;  //기존이미지
    var sindex=0;  //선택된 새이미지

    //index번째 비주얼이미지 이동하는 함수생성
    function slideImg(sindex){

        targetX=-(sindex*img_w); //움직이는 거리(너비)

        $(".slide ul").animate({left:targetX},600);
        $(".btn ul li").eq(soldidx).removeClass("active");  //기존버튼 비활성화
        $(".btn ul li").eq(sindex).addClass("active");  //선택버튼 활성화
        soldidx=sindex;

    }

    //슬라이드 자동함수 생성
    function slideAuto(){

        sindex++;   
        if(sindex==simg_n){ //simg_n은 이미지개수 4, index는 0,1,2,3
            sindex=0;
        }
        slideImg(sindex);

    }

    auto=setInterval(slideAuto,4000);

    //하단버튼 클릭
    $(".btn ul li").click(function(){

        clearInterval(auto);  //버튼클릭시 자동함수 해지
        $(".play").hide();
        $(".stop").show();

        sindex=$(this).index();
        slideImg(sindex);     
        auto=setInterval(slideAuto,4000); //버튼 클릭안할땐 다시 자동함수 실행
    
    });

    //이전버튼 클릭
    $(".side_btn .lbtn").click(function(){

        clearInterval(auto);  //버튼클릭시 자동함수 해지
        $(".play").hide();
        $(".stop").show();

        sindex--;
        if(sindex<0){  //첫번째 이미지까지 오면 다시 맨 마지막 이미지부터 다시....
            sindex=simg_n-1; //총개수 4(이미지4컷)에서 1을 뺀 3->index=3(3,2,1,0) 
        }   
        slideImg(sindex);       
        auto=setInterval(slideAuto,4000); //버튼 클릭안할땐 다시 자동함수 실행
    
    });


    //다음버튼 클릭
    $(".side_btn .rbtn").click(function(){

        clearInterval(auto);  //버튼클릭시 자동함수 해지
        $(".play").hide();
        $(".stop").show();
        
        sindex++;   
        if(sindex>simg_n-1){ //총개수 4(이미지4컷)에서 1을 뺀 3->index=3(0,1,2,3)
            sindex=0;      
        }
        slideImg(sindex);       
        auto=setInterval(slideAuto,4000); //버튼 클릭안할땐 다시 자동함수 실행
    
    });





    //썸네일과 큰이미지가 바뀌는 함수만들기
    var mimg_w= $(".thumbs li").width()+12;   //이미지의 가로너비
    var mimg_n= $(".thumbs li").length;  //이미지의 총개수  
    var oldidx=0;  //기존이미지
    var idx=0;  //새로 바뀌는 이미지

    function changeImg(idx){  //매개변수가 있는 함수 > idx는 선택되는 이미지 

        if(oldidx!=idx){  //기존의 이미지와 선택된 이미지가 다를때...

            targetX=-(idx*mimg_w); //움직이는 거리(너비)
            $(".thumbs").animate({left:targetX},600);


            $(".thumbs li").eq(idx).css({"opacity":0.5});  //선택된 썸네일 이미지
            $(".thumbs li").eq(oldidx).css({"opacity":1});  //기존의 썸네일 이미지
            $(".largeImg li").eq(idx).stop(true,true).fadeIn(300);  //선택된 이미지 나타남
            $(".largeImg li").eq(oldidx).stop(true,true).fadeOut(300);  //기존 이미지 사라짐
            $(".bar ul li").eq(oldidx).removeClass("bar_on"); 
            $(".bar ul li").eq(idx).addClass("bar_on"); 

        }
        oldidx=idx;  //선택된 이미지는 다시 기존이미지로 저장되어서 Fade Out...

    }

    //썸네일버튼 클릭시...
    $(".thumbs li").click(function(){
        idx=$(this).index();  //0,1,2,...
        changeImg(idx);
    });

    $(".bar ul li").click(function(){
        idx=$(this).index();  //0,1,2,...
        changeImg(idx);
    });

    //이전버튼 클릭시...
    $(".left_btn").click(function(){
        idx--;
        //선택한 이미지가 첫번째일때 다시 맨뒤 이미지부터 시작
        if(idx<0){
            idx=4;
        }
        changeImg(idx);
    });

    //다음버튼 클릭시...
    $(".right_btn").click(function(){
        idx++;
        //선택한 이미지가 첫번째일때 다시 맨뒤 이미지부터 시작
        if(idx>=mimg_n-1){
            idx=0;
        }
        changeImg(idx);
    });



});