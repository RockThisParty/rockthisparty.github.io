(function(){
	var canvas = document.createElement('canvas')
	contxt = canvas.getContext('2d')
	w = canvas.width = innerWidth,
    h = canvas.height = innerHeight,
	particles = [],
	properties = {
		bgColor				: 'rgba(1,17,1,1)',
		particleColor		: 'rgba(200,10,40,1)',
		particleRadius		: 3,
		particleCount		: 250,
		particleMaxVelocity	: 0.5,
		lineLength 			: 150,
		particleLive		: 6
	};
	document.querySelector('body').appendChild(canvas);

	window.onresize = function(){
		w = canvas.width = innerWidth,
		h = canvas.heght = innerHeight;	
	}

	class Particle{
		constructor(){
			this.x = Math.random()*w;
			this.y = Math.random()*h;
			this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
			this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
			this.live = Math.random()*properties.particleLive*60;
		}
		position(){
			this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0?this.velocityX*=-1:this.velocityX;
			this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0?this.velocityY*=-1:this.velocityY;
			this.x += this.velocityX;
			this.y += this.velocityY;
		}
		reDraw(){
			contxt.beginPath();
			contxt.arc(this.x, this.y, properties.particleRadius, 0, Math.PI*2);
			contxt.closePath();
			contxt.fillStyle = properties.particleColor;
			contxt.fill();
		}
		reLive(){
			if(this.live < 1){
				this.x = Math.random()*w;
				this.y = Math.random()*h;
				this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
				this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
				this.live = Math.random()*properties.particleLive*60;
			}
			this.live--;
		}
	}

	function reDrawBackground(){
		contxt.fillStyle = properties.bgColor;
		contxt.fillRect(0,0,w,h);
	}

	function drawLines(){
		var x1, y1, x2, y2, length, opacity;
		for(var i in particles){
			for(var j in particles){
				x1 = particles[i].x;
				y1 = particles[i].y;
				x2 = particles[j].x;
				y2 = particles[j].y;
				length = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2 - y1, 2));
				if(length < properties.lineLength){
					opacity = 1 - length/properties.lineLength;
					contxt.lineWidth = '0.5';
					contxt.strokeStyle = 'rgba(255,40,40,'+opacity+')';
					contxt.beginPath();
					contxt.moveTo(x1, y1);
					contxt.lineTo(x2, y2);
					contxt.closePath();
					contxt.stroke();
				}
			}
		}
	}

	function reDrawParticles(){
		for(var i in particles){
			particles[i].reLive();
			particles[i].position();
			particles[i].reDraw();
		}
	}

	function loop(){
		reDrawBackground();
		reDrawParticles();
		drawLines();
		requestAnimationFrame(loop);
	}

	function init(){
		for(var i=0; i<properties.particleCount; i++){
			particles.push(new Particle);
		}
		loop();
	}

	init();
}())
