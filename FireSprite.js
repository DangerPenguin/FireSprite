//FireSprite.js - an extremely simple Javascript, canvas-based sprite sheet parser for TexturePacker sprite sheets.
//Created by Nicholas Wrenn on 12/14/2012
//Last Modified by Nicholas Wrenn on 3/16/2013
//Version - 0.1.1
//Check out my game company at www.goldenvaultgames.com

function FireSpriteAtlas(jsonArray){

	//The jsonArray
	this.srcArray = jsonArray;

	//Get the location of the Image file from the passed in argument
	this.spriteSheetLocation = jsonArray.meta.image;
	
	//Create an Image to house the spriteSheet then load it in
	this.SpriteSheet = new Image();
	this.SpriteSheet.src = this.spriteSheetLocation;

	//By passing in a key (the sprites name) it loops through the atlas to find it and if so returns it
	this.createSprite = function(keyName){
		var foundSprite = false;

		for(var i = 0; i < this.srcArray.frames.length; i++){
			if(this.srcArray.frames[i].filename == keyName){
				var wantedSprite = this.srcArray.frames[i];
				return new this.FireSprite(this.SpriteSheet, wantedSprite.frame.x, wantedSprite.frame.y, wantedSprite.frame.w, wantedSprite.frame.h);
				foundSprite = true;
				break;
			}
		}
		
		//returns an alert error if it cant find the sprite, comment out if you dont want it (it wont break anything if its gone)
		if(!foundSprite){
			alert("Error: Sprite \""+keyName+"\" not found in " + this.spriteSheetLocation);
		}

	}//endof createSprite

	this.createSpriteCanvas = function(keyName){
		var foundSprite = false;

		for(var i = 0; i < this.srcArray.frames.length; i++){
			if(this.srcArray.frames[i].filename == keyName){
				var wantedSprite = this.srcArray.frames[i];
				return new this.FireSpriteCanvas(this.SpriteSheet, wantedSprite.frame.x, wantedSprite.frame.y, wantedSprite.frame.w, wantedSprite.frame.h);
				foundSprite = true;
				break;
			}
		}
		
		//returns an alert error if it cant find the sprite, comment out if you dont want it (it wont break anything if its gone)
		if(!foundSprite){
			alert("Error: Sprite \""+keyName+"\" not found in " + this.spriteSheetLocation);
		}
	}//endof createSpriteCanvas

	this.FireSprite = function(sourceSpriteSheet, sourceX, sourceY, sourceWidth, sourceHeight){
		this.srcImage = sourceSpriteSheet;
		this.srcX = sourceX;
		this.srcY = sourceY;
		this.srcWidth = sourceWidth;
		this.srcHeight = sourceHeight;
		this.scale = 1.0;

		this.draw = function(canvasContext, drawX, drawY){
			canvasContext.drawImage(this.srcImage, this.srcX, this.srcY, this.srcWidth, this.srcHeight, drawX, drawY, this.srcWidth*this.scale, this.srcHeight*this.scale);
		}//endof draw

		this.setScale = function(newScale){
			this.scale = newScale;

			if(this.scale < 0.0){
				this.setScale(0.0);
			}
		}//endof setScale

		this.getWidth = function(){
			return this.srcWidth * this.scale;
		}//endof getWidth

		this.getHeight = function(){
			return this.srcHeight * this.scale;
		}//endof getHeight

		this.getScale = function(){
			return this.scale;
		}//endof getScale
	}//endof FireSprite

	this.FireSpriteCanvas = function(sourceSpriteSheet, sourceX, sourceY, sourceWidth, sourceHeight){
		var imageCanvas = document.createElement('canvas');
		imageCanvas.width = sourceWidth;
		imageCanvas.heigh = sourceHeight;
		var imageContext = imageCanvas.getContext("2d");
		imageContext.drawImage(sourceSpriteSheet, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);

		return imageCanvas;
	}//endof FireSpriteCanvas

}//endof FireSpriteAtlas
