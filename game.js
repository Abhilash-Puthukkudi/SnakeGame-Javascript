
		
		var body = [];
		var state = 0; // 0 -> RIGHT , 1 -> DOWN , 2 -> LEFT, 3 -> UP;

		//CANVAS SETTING
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "#A7D948";
		ctx.fillRect(0, 0, 520, 520);

		//READING KEYPRESS
		function handleKey(e) {
		    e = e || window.event;
		    var play = false;

		    if (e.keyCode == '38'&&state!=1&&state!=3) {
		        // UP ARROW
		        state = 3;
		        play = true;

		    }
		    else if (e.keyCode == '40'&&state!=1&&state!=3) {
		        // DOWN ARROW
		        state = 1;
		        play = true;
		    }
		    else if (e.keyCode == '37'&&state!=0&&state!=2) {
		       // LEFT ARROW
		        state = 2;
		        play = true;
		    }
		    else if (e.keyCode == '39'&&state!=0&&state!=2) {
		       // RIGHT ARROW
		        state = 0;
		        play = true;
		    }

		    if(play)
		    playAudio();
		   
		}

		document.onkeydown = handleKey;

		function playAudio(){
			var audio = new Audio('https://www.soundjay.com/switch/switch-1.wav');
            audio.play();			
		}

		function playConsume(){			
			var audio = new Audio('https://www.soundjay.com/button/button-3.wav');
            audio.play();			
		}

		var N = 20;
		var size = 520;
		var cellSize = size/N;
		var matrix = new Array(N);
		for (var i = 0; i < matrix.length; i++) {
		  matrix[i] = new Array(N);
		}

		function drawCell(i,j){
			if( (i+j)%2==0 ) {
				ctx.fillStyle = ("#8ECC39");
			}else{
			ctx.fillStyle = "#A7D948";
			}
			ctx.fillRect(cellSize*i, cellSize*j, cellSize, cellSize);
		}

		for (var i = 0; i < matrix.length; i++){
			for (var j = 0; j < matrix[i].length; j++){
				matrix[i][j]=0;
				drawCell(i,j);
			}
		}

		body.push([1+ N/2,N/2]);
		body.push([N/2,N/2]);
		body.push([-1+N/2,N/2]);

		var eyeImage = new Image();
		eyeImage.src = "https://i.imgur.com/6jLbz7l.png";
		
		var foodImage = new Image();
		foodImage.src = "https://i.imgur.com/88saChB.png";

		var counter = 0;
		var foodX = 0;
		var foodY = 0;
       // GENERATING FOOD ON RANDOM PLACE
		function generateFood(){
			
			var success = false;
			while(!success){
				foodX = parseInt(Math.random()*N);
				foodY = parseInt(Math.random()*N);

				success = true;
				for(var i=0;i<body.length;i++){
					if(body[i][0]==foodX && body[i][1]==foodY){
						success = false;
					}
				}
			}
		}

		generateFood();

		function update(){
			
			counter++;

			var increase = false;
			if(body[0][0]==foodX&&body[0][1]==foodY){
				generateFood();
				playConsume();
				increase = true;
			}

			for (var i = 0; i < matrix.length; i++){
				for (var j = 0; j < matrix[i].length; j++){
					drawCell(i,j);
				}
			}
			
			ctx.drawImage(foodImage,
						foodX*cellSize, foodY*cellSize,
						cellSize, cellSize);

			for(var i=0;i<body.length;i++){
				ctx.fillStyle = ("#527DF9");
				ctx.fillRect(cellSize*body[i][0], cellSize*body[i][1], cellSize, cellSize);

				if(i==0){
					var marginX = cellSize/3;
					var marginY = cellSize/3;
					
					if(state==0||state==2){
						marginX=0;
					}else if (state==1||state==3){
						marginY=0;
					}

 					ctx.drawImage(eyeImage,
 						0,28*(counter%9),
 						cellSize,cellSize,
 						cellSize*body[i][0]+marginX, 
						cellSize*body[i][1]+marginY,
						cellSize, cellSize);
					ctx.drawImage(eyeImage,
						0,28*(counter%9),
						cellSize,cellSize,
						cellSize*body[i][0]-marginX, 
						cellSize*body[i][1]-marginY, 
						cellSize, cellSize);
					
				
				}
			}	

		    // 0 -> RIGHT, 1 -> DOWN  2 -> LEFT , 3 -> UP;
		    var x = 0;
		    var y = 0;
		    if(state==0){
		    	x++;
		    }
		    else if(state==1){
		    	y++;
		    }
		    else if(state==2){
		    	x--;
		    }
		    else if(state==3){
		    	y--;
		    }

		    var first = body[0];
		    var arr = [ first[0]+x , first[1]+y ];
		    body.splice(0,0, arr);

		    if(!increase)
		    body.pop();
		}

		setInterval(update,300);

