function initializeGames() {

	ACTIONS={

		// SHMUP

		moveShipUp:[
			{sumScore:-1},
			{as:{type:["player"]},moveBy:{gridY:-1}}
		],
		moveShipDown:[
			{sumScore:-1},
			{as:{type:["player"]},moveBy:{gridY:1}}
		],
		moveShipLeft:[
			{sumScore:-1},
			{as:{type:["player"]},moveBy:{gridX:-1}}
		],
		moveShipRight:[
			{sumScore:-1},
			{as:{type:["player"]},moveBy:{gridX:1}}
		],
		shipFire:[
			{sumScore:-1},
			{playAudio:"laser",as:{type:["player"]},spawn:["_playerbullet"]}
		],
		movePlatformLeft:[
			{sumScore:-1},
			{as:{type:["player"]},moveBy:{gridX:-1}}
		],

		// Platformer

		movePlatformRight:[
			{sumScore:-1},
			{as:{type:["player"]},moveBy:{gridX:1}}
		],
		movePlatformJump:[
			{sumScore:-1},
			{as:{type:["playerwalking"]},moveBy:{gridY:-1}}
		],
		movePlatformDoubleJump:[
			{sumScore:-1},
			{as:{type:["player"]},replaceThisWith:"_playerwalking",moveBy:{gridY:-1}}
		],
		movePlatformDown:[
			{sumScore:-1},
			{as:{type:["playerwalking"]},moveBy:{gridY:1}}
		],
		draw:[
			{sumScore:-1},
			{runAI:{times:1},draw:true}
		],
		gravity:{as:{type:["playerwalking"]},moveBy:{gridY:1,ifCollidesWith:[{with:{type:["wall"]},then:{cancelMove:true},else:{cancelMove:true,replaceThisWith:"_playerfalling"}}]}},

		// Maze

		moveMazeUp:[
			{sumScore:-1},
			{as:{type:["normalplayer"]},replaceThisWith:"_playerup"},
			{as:{type:["powerplayer"]},replaceThisWith:"_powerplayerup"},
		],
		moveMazeDown:[
			{sumScore:-1},
			{as:{type:["normalplayer"]},replaceThisWith:"_playerdown"},
			{as:{type:["powerplayer"]},replaceThisWith:"_powerplayerdown"}
		],
		moveMazeLeft:[
			{sumScore:-1},
			{as:{type:["normalplayer"]},replaceThisWith:"_playerleft"},
			{as:{type:["powerplayer"]},replaceThisWith:"_powerplayerleft"}
		],
		moveMazeRight:[
			{sumScore:-1},
			{as:{type:["normalplayer"]},replaceThisWith:"_playerright"},
			{as:{type:["powerplayer"]},replaceThisWith:"_powerplayerright"}
		],
		mazeGainPower:[
			{sumScore:-1,playAudio:"powerup"},
			{as:{type:["normalplayerup"]},replaceThisWith:"_powerplayerup"},
			{as:{type:["normalplayerdown"]},replaceThisWith:"_powerplayerdown"},
			{as:{type:["normalplayerleft"]},replaceThisWith:"_powerplayerleft"},
			{as:{type:["normalplayerright"]},replaceThisWith:"_powerplayerright"},
		],
		mazeLosePower:[
			{as:{type:["powerplayerup"]},replaceThisWith:"_playerup"},
			{as:{type:["powerplayerdown"]},replaceThisWith:"_playerdown"},
			{as:{type:["powerplayerleft"]},replaceThisWith:"_playerleft"},
			{as:{type:["powerplayerright"]},replaceThisWith:"_playerright"},
		],
		mazeGo:[
			{as:{type:["playerup"]},moveBy:{gridY:-1}},
			{as:{type:["playerdown"]},moveBy:{gridY:1}},
			{as:{type:["playerleft"]},moveBy:{gridX:-1}},
			{as:{type:["playerright"]},moveBy:{gridX:1}},
		],

		// Racing

		steerRight:[
			{as:{type:["steer"]},moveBy:{gridX:1}},
		],
		steerLeft:[
			{as:{type:["steer"]},moveBy:{gridX:-1}},
		],
		moveCar:[
			{sumScore:10},
			{as:{type:["car"]},into:{x1:1,y1:1,x2:8,y2:7},moveBy:{gridY:-1}},

			{as:{type:["steer"]},into:{x1:0,y1:0,x2:1,y2:8},moveBy:{gridX:2},ifNotEmpty:{
				sub:[{as:{type:["car"]},moveBy:{gridX:-2}}]
			}},
			{as:{type:["steer"]},into:{x1:2,y1:0,x2:3,y2:8},moveBy:{gridX:1},ifNotEmpty:{
				sub:[{as:{type:["car"]},moveBy:{gridX:-1}}]
			}},

			{as:{type:["steer"]},into:{x1:5,y1:0,x2:6,y2:8},moveBy:{gridX:-1},ifNotEmpty:{
				sub:[{as:{type:["car"]},moveBy:{gridX:1}}]
			}},
			{as:{type:["steer"]},into:{x1:7,y1:0,x2:8,y2:8},moveBy:{gridX:-2},ifNotEmpty:{
				sub:[{as:{type:["car"]},moveBy:{gridX:2}}]
			}},
			{as:{type:["fuel"]},moveBy:{gridY:-1}}
		],
	};

	GAMES=[

		{

			// A Cardcade version of early shoot-em-ups.
			// It may get a little intense, hence the danmaku reference.

			id:"itadanmaku",
			name:"Itadanmaku",
			logoId:0,
			description:[
				"DODGE TONS OF BULLETS",
				"AND TAKE DOWN ALIENS!"
			],
			manual:[
				{format:"title",text:"How to play"},
				{format:"line",text:"Move your spaceship and fire playing your hand of cards. Every time you or the AI plays a card, bullets and bonuses move. Every time you draw a new card AI activates."},
				{format:"line",text:"Your bullets can destroy enemy spaceships and weaken solid blue walls. Weak walls can be broken by your and enemy bullets."},
				{format:"line",text:"Destroyed aliens drop a bonus that your ship can pick up. Pick it up to move a card from the Bonus deck to your Discard pile, improving your spaceship."},
				{format:"title",text:"Losing"},
				{format:"line",text:"You lose when your spaceships hit walls, enemy bullets, or enemy spaceships. You also lose if your spaceship moves outside the game board."},
				{format:"title",text:"Winning"},
				{format:"line",text:"You win when your Bonus deck is empty."}
			],
			decks:{
				bonusDeck:[
					{card:"upright"},
					{card:"rightdown"},
					{card:"leftdown"},
					{card:"leftup"},
					{card:"upfire"},
					{card:"downfire"},
					{card:"rightfire"},
					{card:"leftfire"},
					{card:"leftright"},
					{card:"updown"},
				],
				playerDeck:[
					{card:"up",amount:4},
					{card:"down",amount:4},
					{card:"left",amount:4},
					{card:"right",amount:4},
					{card:"fire",amount:4}
				],
				aiDeck:[
					{card:"scrollStageGate"},
					{card:"scrollStageGate2"},
					{card:"scrollStageObstacle"},
					{card:"enemyFire",amount:5},
					{card:"scrollStageTunnel",amount:5},
					{card:"pause",amount:1}
				]
			},
			cards:{

				// Turn card

				_turncard:{size:CARDSIZES.normalDouble,type:["turnCard"],labels:[
					{
						// Preparation
						do:[
							{atRange:{x1:0,y1:8,x2:8,y2:8},spawn:["_wall"]},
							{at:{gridX:1,gridY:4},spawn:["_playership"]},
							{runAI:{times:3,skipConditions:true}},
							{setScore:100}
						]
					},
					{
						// At turn end...
						do:[
							{as:{type:["playerbullet"]},moveBy:{gridX:1}},
							{as:{type:["enemybullet"]},moveBy:{gridX:-1}},
							{as:{type:["bonus"]},moveBy:{gridX:-1}}			
						]
					},{
						// Conditions
						do:[
								{
									as:{type:["playerbullet"]},
									ifCollidesWith:{type:["enemy"]},
									then:
										{playAudio:"explosion",removeThis:true,replaceThatWith:"_bonus"} // Killed enemies turns in bonus
									
								},				
								{
									as:{type:["playerbullet"]},
									ifCollidesWith:{type:["wall"]},
									then:
										{playAudio:"break",removeThis:true,replaceThatWith:"_brokenwall"} // Player can weaken wall
								},
								{
									as:{type:["enemybullet"]},
									ifCollidesWith:{type:["wall"]},
									then:
										{removeThis:true} // Enemy can't break walls
								},
								{
									as:{type:["bullet"]},
									ifCollidesWith:{type:["brokenwall"]},
									then:
										{playAudio:"break",removeThis:true,removeThat:true} // Aliens & players can break weak walls
								},

								// Growth

								{
									as:{type:["player"]},
									ifCollidesWith:{type:["bonus"]},
									then:
										{removeThat:true,earnCard:true,sumScore:100,playAudio:"bonus"}
								},

								// Defeat

								{
									as:{type:["player"]},
									ifIsEmpty:{gameOver:"YOUR SHIP IS LOST!",playAudio:"fall"}
								},
								{
									as:{type:["obstacle"]},
									ifCollidesWith:{type:["player"]},
									then:
										{gameOver:"YOUR SHIP CRASHED!",playAudio:"explosion"}
								},
								{
									as:{type:["killplayer"]},
									ifCollidesWith:{type:["player"]},
									then:
										{gameOver:"SHIP DESTROYED!",playAudio:"explosion"}
								},

								// Win
								{
									as:{bonusDeck:1},
									ifIsEmpty:{gameClear:"ALL BONUS COLLECTED!"}
								},
							]
						}
					]
				},

				// Player cards - Base

				up:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:0,labelColor:PALETTE.yellow,do:ACTIONS.moveShipUp},
					{labelId:6,labelColor:PALETTE.yellow,do:ACTIONS.draw}
				]},
				down:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:2,labelColor:PALETTE.yellow,do:ACTIONS.moveShipDown},
					{labelId:6,labelColor:PALETTE.yellow,do:ACTIONS.draw}
				]},
				left:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:3,labelColor:PALETTE.yellow,do:ACTIONS.moveShipLeft},
					{labelId:6,labelColor:PALETTE.yellow,do:ACTIONS.draw}
				]},
				right:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:1,labelColor:PALETTE.yellow,do:ACTIONS.moveShipRight},
					{labelId:6,labelColor:PALETTE.yellow,do:ACTIONS.draw}
				]},
				fire:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:4,labelColor:PALETTE.yellow,do:ACTIONS.shipFire},
					{labelId:6,labelColor:PALETTE.yellow,do:ACTIONS.draw},
				]},

				// Player cards - Bonus

				updown:{size:CARDSIZES.normalDouble,isSpecial:true,type:["playerAction"],labels:[
					{labelId:0,labelColor:PALETTE.yellow,do:ACTIONS.moveShipUp},
					{labelId:2,labelColor:PALETTE.yellow,do:ACTIONS.moveShipDown},
				]},
				leftright:{size:CARDSIZES.normalDouble,isSpecial:true,type:["playerAction"],labels:[
					{labelId:0,labelColor:PALETTE.yellow,do:ACTIONS.moveShipLeft},
					{labelId:2,labelColor:PALETTE.yellow,do:ACTIONS.moveShipRight},
				]},
				upright:{size:CARDSIZES.normalDouble,isSpecial:true,type:["playerAction"],labels:[
					{labelId:0,labelColor:PALETTE.yellow,do:ACTIONS.moveShipUp},
					{labelId:1,labelColor:PALETTE.yellow,do:ACTIONS.moveShipRight},
				]},
				rightdown:{size:CARDSIZES.normalDouble,isSpecial:true,type:["playerAction"],labels:[
					{labelId:1,labelColor:PALETTE.yellow,do:ACTIONS.moveShipRight},
					{labelId:2,labelColor:PALETTE.yellow,do:ACTIONS.moveShipDown},
				]},
				leftdown:{size:CARDSIZES.normalDouble,isSpecial:true,type:["playerAction"],labels:[
					{labelId:2,labelColor:PALETTE.yellow,do:ACTIONS.moveShipDown},
					{labelId:3,labelColor:PALETTE.yellow,do:ACTIONS.moveShipLeft},
				]},
				leftup:{size:CARDSIZES.normalDouble,isSpecial:true,type:["playerAction"],labels:[
					{labelId:3,labelColor:PALETTE.yellow,do:ACTIONS.moveShipLeft},
					{labelId:0,labelColor:PALETTE.yellow,do:ACTIONS.moveShipUp}
				]},
				upfire:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:0,labelColor:PALETTE.yellow,do:ACTIONS.moveShipUp},
					{labelId:4,labelColor:PALETTE.yellow,do:ACTIONS.shipFire},
				]},
				downfire:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:2,labelColor:PALETTE.yellow,do:ACTIONS.moveShipDown},
					{labelId:4,labelColor:PALETTE.yellow,do:ACTIONS.shipFire},
				]},
				leftfire:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:3,labelColor:PALETTE.yellow,do:ACTIONS.moveShipLeft},
					{labelId:4,labelColor:PALETTE.yellow,do:ACTIONS.shipFire},
				]},
				rightfire:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:1,labelColor:PALETTE.yellow,do:ACTIONS.moveShipRight},
					{labelId:4,labelColor:PALETTE.yellow,do:ACTIONS.shipFire},
				]},
				
				// AI Cards

				pause:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:5,labelColor:PALETTE.gray}]},
				scrollStageGate:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:3,labelColor:PALETTE.blue,do:[
					{as:{type:["scrolling"]},moveBy:{gridX:-1}},
					{at:{gridX:8,gridY:0},spawn:["_wall"]},

					{at:{gridX:8,gridY:2},spawn:["_enemy"]},
					{at:{gridX:8,gridY:3},spawn:["_wall"]},
					{at:{gridX:8,gridY:4},spawn:["_wall"]},
					{at:{gridX:8,gridY:5},spawn:["_wall"]},
					{at:{gridX:8,gridY:6},spawn:["_enemy"]},

					{at:{gridX:8,gridY:8},spawn:["_wall"]},
				]}]},
				scrollStageGate2:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:3,labelColor:PALETTE.blue,do:[
					{as:{type:["scrolling"]},moveBy:{gridX:-1}},
					{at:{gridX:8,gridY:0},spawn:["_wall"]},

					{at:{gridX:8,gridY:2},spawn:["_enemy"]},

					{at:{gridX:8,gridY:4},spawn:["_enemy"]},

					{at:{gridX:8,gridY:6},spawn:["_enemy"]},

					{at:{gridX:8,gridY:8},spawn:["_wall"]},
				]}]},
				scrollStageTunnel:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:3,labelColor:PALETTE.blue,do:[
					{as:{type:["scrolling"]},moveBy:{gridX:-1}},
					{at:{gridX:8,gridY:0},spawn:["_wall"]},		
					{at:{gridX:8,gridY:8},spawn:["_wall"]},
				]}]},
				scrollStageObstacle:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:3,labelColor:PALETTE.blue,do:[
					{as:{type:["scrolling"]},moveBy:{gridX:-1}},
					{at:{gridX:8,gridY:0},spawn:["_wall"]},

					{at:{gridX:8,gridY:2},spawn:["_wall"]},
					{at:{gridX:8,gridY:3},spawn:["_wall"]},

					{at:{gridX:8,gridY:5},spawn:["_wall"]},
					{at:{gridX:8,gridY:6},spawn:["_wall"]},

					{at:{gridX:8,gridY:8},spawn:["_wall"]},
				]}]},
				enemyFire:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:4,labelColor:PALETTE.purple,do:[
					{as:{type:["enemy"]},playAudio:"laser",delta:{gridX:-1},spawn:["_enemybullet"]}
				]}]},

				// Board cards

				_playership:{size:CARDSIZES.small,labels:[{labelId:0,labelColor:PALETTE.yellow}],type:["board","player"]},
				_wall:{size:CARDSIZES.small,labels:[{labelId:5,labelColor:PALETTE.blue}],type:["board","scrolling","wall","obstacle"]},
				_brokenwall:{size:CARDSIZES.small,labels:[{labelId:6,labelColor:PALETTE.blue}],type:["board","scrolling","brokenwall","obstacle"]},
				_playerbullet:{size:CARDSIZES.small,labels:[{labelId:1,labelColor:PALETTE.yellow}],type:["board","bullet","playerbullet"]},
				_enemybullet:{size:CARDSIZES.small,priority:10,labels:[{labelId:3,labelColor:PALETTE.purple}],type:["board","bullet","scrolling","enemybullet","killplayer"]},
				_enemy:{size:CARDSIZES.small,labels:[{labelId:2,labelColor:PALETTE.purple}],type:["board","scrolling","enemy","killplayer"]},
				_bonus:{size:CARDSIZES.small,priority:5,labels:[{labelId:4,labelColor:PALETTE.green}],type:["board","bonus"]},
			}
		},

		{

			// A Cardcade platformer. It's a little whacky but still
			// gives the sense of jumping and squashing baddies.

			id:"supersquasher",
			name:"Super Squasher",
			logoId:1,
			description:[
				"RUN AND JUMP CAREFULLY,",
				"SQUASH THE BADDIES!"
			],
			manual:[
				{format:"title",text:"How to play"},
				{format:"line",text:"Tim has two poeses: walking and falling. Tim can jump and run playing your hand of cards but jump does not affect Falling Tim. Every time you or the AI plays a card, Falling Tim moves down or turns into Walking Tim if can't move."},
				{format:"line",text:"Every time you draw a new card AI activates. Every time the AI plays an arrow card and there isn't a wall under Tim it becomes Falling Tim."},
				{format:"line",text:"When Falling Tim moves down on a baddie he bounces moving up 2 spaces as Walking Tim and turns the baddie in a bonus. When Tim picks it up a card is moved from the Bonus deck to your Discard pile, giving Tim new abilities."},
				{format:"title",text:"Losing"},
				{format:"line",text:"You lose when Tim hits a baddie without squashing it or any time he crashes on a wall. You also lose if Tim moves outside the game board."},
				{format:"title",text:"Winning"},
				{format:"line",text:"You win when your Bonus deck is empty."}
			],
			decks:{
				bonusDeck:[
					{card:"jumpright",amount:2},
					{card:"jumpleft",amount:2},
					{card:"leftright",amount:2},	
					{card:"down",amount:2},
					{card:"doublejump",amount:2}	
				],
				playerDeck:[
					{card:"jump",amount:4},
					{card:"left",amount:4},
					{card:"right",amount:4}
				],
				aiDeck:[
					{card:"pause",amount:2},
					{card:"scrollStage1"},
					{card:"scrollStage2"},
					{card:"scrollStage3"},
					{card:"scrollStage4"},
					{card:"scrollStage5"},
					{card:"scrollStage6"},
					{card:"scrollStage7"},
				]
			},
			cards:{

				// Turn card

				_turncard:{size:CARDSIZES.normalDouble,type:["turnCard"],labels:[
					{
						// Preparation
						do:[
							{atRange:{x1:0,y1:8,x2:8,y2:8},spawn:["_wall"]},							
							{at:{gridX:3,gridY:7},spawn:["_playerwalking"]},
							{runAI:{times:3,skipConditions:true}},
							{setScore:100}
						]
					},
					{
						// At turn end...
						do:[
							// Win
							
													
							{as:{type:["playerfalling"]},moveBy:{gridY:1,ifCollidesWith:[{with:{type:["wall"]},then:{cancelMove:true,replaceThisWith:"_playerwalking"}}]}},
							{as:{
								type:["playerfalling"]},
								ifCollidesWith:{type:["enemy"]},
								then:{
									moveBy:{gridY:-2},
									replaceThisWith:"_playerwalking",
									removeThat:true,playAudio:"squash",spawn:["_bonus"]
								}
							},
							{
								as:{type:["player"]},
								ifCollidesWith:{type:["bonus"]},
								then:
									{removeThat:true,earnCard:true,sumScore:100,playAudio:"bonus"}
							},
							
							
						]
					},{
						// Conditions
						do:[
							{
								as:{bonusDeck:1},
								ifIsEmpty:{gameClear:"ALL BONUS COLLECTED!"}
							},
							{
								as:{type:["player"]},
								ifIsEmpty:{gameOver:"OUT OF BOARD!",playAudio:"fall"}
							},
							{as:{
								type:["player"]},
								ifCollidesWith:{type:["wall"]},
								then:{gameOver:"SMASHED TO A WALL!",playAudio:"explosion"}
							},
							{as:{
								type:["player"]},
								ifCollidesWith:{type:["enemy"]},
								then:{gameOver:"CAUGHT BY ENEMY!",playAudio:"lose"}
							}
						]
						}
					]
				},

				// Player cards - Base

				jump:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:0,labelColor:PALETTE.yellow,do:ACTIONS.movePlatformJump},
					{labelId:6,labelColor:PALETTE.yellow,do:ACTIONS.draw}
				]},
				left:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:3,labelColor:PALETTE.yellow,do:ACTIONS.movePlatformLeft},
					{labelId:6,labelColor:PALETTE.yellow,do:ACTIONS.draw}
				]},
				right:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:1,labelColor:PALETTE.yellow,do:ACTIONS.movePlatformRight},
					{labelId:6,labelColor:PALETTE.yellow,do:ACTIONS.draw}
				]},

				jumpright:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:0,labelColor:PALETTE.yellow,do:ACTIONS.movePlatformJump},
					{labelId:1,labelColor:PALETTE.yellow,do:ACTIONS.movePlatformRight}
				]},
				jumpleft:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:0,labelColor:PALETTE.yellow,do:ACTIONS.movePlatformJump},
					{labelId:1,labelColor:PALETTE.yellow,do:ACTIONS.movePlatformLeft}
				]},
				leftright:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:0,labelColor:PALETTE.yellow,do:ACTIONS.movePlatformLeft},
					{labelId:1,labelColor:PALETTE.yellow,do:ACTIONS.movePlatformRight}
				]},
				down:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:2,labelColor:PALETTE.yellow,do:ACTIONS.movePlatformDown},
					{labelId:2,labelColor:PALETTE.yellow,do:ACTIONS.movePlatformDown},
				]},
				doublejump:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:7,labelColor:PALETTE.yellow,do:ACTIONS.movePlatformDoubleJump},
					{labelId:6,labelColor:PALETTE.yellow,do:ACTIONS.draw}
				]},

				// Player cards - Bonus
				
				// AI Cards

				pause:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:5,labelColor:PALETTE.gray}]},

				scrollStage1:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:3,labelColor:PALETTE.blue,do:[
					{as:{type:["scrolling"]},moveBy:{gridX:-1}},
					{at:{gridX:8,gridY:8},spawn:["_wall"]},
					ACTIONS.gravity
				]}]},

				scrollStage2:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:3,labelColor:PALETTE.blue,do:[
					{as:{type:["scrolling"]},moveBy:{gridX:-1}},
					{at:{gridX:8,gridY:8},spawn:["_wall"]},
					{at:{gridX:8,gridY:7},spawn:["_enemy"]},
					ACTIONS.gravity
				]}]},

				scrollStage3:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:3,labelColor:PALETTE.blue,do:[
					{as:{type:["scrolling"]},moveBy:{gridX:-1}},
					{at:{gridX:8,gridY:8},spawn:["_wall"]},
					ACTIONS.gravity
				]}]},

				scrollStage4:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:3,labelColor:PALETTE.blue,do:[
					{as:{type:["scrolling"]},moveBy:{gridX:-1}},
					ACTIONS.gravity
				]}]},

				scrollStage5:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:3,labelColor:PALETTE.blue,do:[
					{as:{type:["scrolling"]},moveBy:{gridX:-1}},
					{at:{gridX:8,gridY:6},spawn:["_wall"]},
					ACTIONS.gravity
				]}]},

				scrollStage6:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:3,labelColor:PALETTE.blue,do:[
					{as:{type:["scrolling"]},moveBy:{gridX:-1}},
					{at:{gridX:8,gridY:6},spawn:["_wall"]},
					{at:{gridX:8,gridY:3},spawn:["_wall"]},
					{at:{gridX:8,gridY:2},spawn:["_enemy"]},
					ACTIONS.gravity
				]}]},

				scrollStage7:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:3,labelColor:PALETTE.blue,do:[
					{as:{type:["scrolling"]},moveBy:{gridX:-1}},
					{at:{gridX:8,gridY:6},spawn:["_wall"]},
					{at:{gridX:8,gridY:5},spawn:["_enemy"]},
					ACTIONS.gravity
				]}]},

				// Board cards

				_playerwalking:{size:CARDSIZES.small,labels:[{labelId:7,labelColor:PALETTE.yellow}],type:["board","player","playerwalking"]},
				_playerfalling:{size:CARDSIZES.small,labels:[{labelId:8,labelColor:PALETTE.yellow}],type:["board","player","playerfalling"]},
				_wall:{size:CARDSIZES.small,labels:[{labelId:10,labelColor:PALETTE.blue}],type:["board","scrolling","wall","obstacle"]},
				_enemy:{size:CARDSIZES.small,labels:[{labelId:9,labelColor:PALETTE.purple}],type:["board","scrolling","enemy"]},
				_bonus:{size:CARDSIZES.small,labels:[{labelId:11,labelColor:PALETTE.green}],type:["board","scrolling","bonus"]}
			}
		},

		{

			// A Cardcade dot eater. Tried to give a more arcade-ish feeling
			// with procedural maze and score attack.

			id:"birbnkitty",
			name:"Birb'n'Kitty",
			logoId:2,
			description:[
				"RUN FROM THE CATS,","EAT AS MUCH AS YOU CAN!"
			],
			manual:[
				{format:"title",text:"How to play"},
				{format:"line",text:"Change Birb orientation using your hand of cards. Every time you draw a new card AI activates: part of the maze appears, Birb loses its powers and he moves ahead."},
				{format:"line",text:"Eat the small dots to increase your score. Eating a large dot will also add a special card to your deck."},
				{format:"line",text:"When the special card green side is played Birb becomes Super Birb and he can eat cats too! Use the Time cards to move Birb without changing the maze and losing Birb power."},
				{format:"title",text:"Game end"},
				{format:"line",text:"You lose when Birb hits a wall or moves outside the game board. You also lose when normal Birb hits a cat."},
			],
			decks:{
				bonusDeck:[
					{card:"powerup1"},
					{card:"powerup2"},
					{card:"powerup3"},
					{card:"powerup4"}
				],
				playerDeck:[
					{card:"up",amount:2},
					{card:"down",amount:2},
					{card:"left",amount:2},
					{card:"right",amount:2},
					{card:"go",amount:4},
				],
				aiDeck:[
					{card:"pause",amount:4},
					{card:"wall1"},
					{card:"wall2"},
					{card:"wall3"},
					{card:"wall4"},
					{card:"wall5"},
					{card:"wall6"},
					{card:"wall7"},
					{card:"wall8"},
					{card:"wall9"},
					{card:"wall10"},
					{card:"wall11"},

					{card:"dots1"},
					{card:"dots2"},
					{card:"dots3"},
					{card:"dots4"},
					{card:"dots5"},
					{card:"dots6"},
					{card:"dots7"},
					{card:"dots8"},
					{card:"dots9"},
					{card:"dots10"},
					{card:"dots11"},
					{card:"dots12"},
					{card:"dots13"},
					{card:"dots14"},
					{card:"dots15"},
					{card:"dots16"},

					{card:"enemy1"},
					{card:"enemy2"},
					{card:"enemy3"},
					{card:"enemy4"},
					{card:"enemy5"},
					{card:"enemy6"},
					{card:"enemy7"},
					{card:"enemy8"},
					{card:"enemy9"},
					{card:"enemy10"},
					{card:"enemy11"},
					{card:"enemy12"},
					{card:"enemy13"},
					{card:"enemy14"},
					{card:"enemy15"},
					{card:"enemy16"},
					{card:"enemy17"},
					{card:"enemy18"},
					{card:"enemy19"},
					{card:"enemy20"},

				]
			},
			cards:{

				// Turn card

				_turncard:{size:CARDSIZES.normalDouble,type:["turnCard"],labels:[
					{
						// Preparation
						do:[
							


							{at:{gridX:0,gridY:0},spawn:["_largedot"]},
							{at:{gridX:8,gridY:8},spawn:["_largedot"]},
							{at:{gridX:0,gridY:8},spawn:["_largedot"]},
							{at:{gridX:8,gridY:0},spawn:["_largedot"]},

							{runAI:{times:3,skipConditions:true}},
							{at:{gridX:4,gridY:7},spawn:["_playerleft"]},

							{setScore:100}
						]
					},
					{
						// At turn end...
						do:[
							{
								as:{type:["player"]},
								ifCollidesWith:{type:["bonus"]},
								then:
									{removeThat:true,earnCard:true,sumScore:100,playAudio:"bonus"}
							},
							{
								as:{type:["player"]},
								ifCollidesWith:{type:["smalldot"]},
								then:
									{removeThat:true,sumScore:20,playAudio:"eat"}
							},
							{
								as:{type:["powerplayer"]},
								ifCollidesWith:{type:["enemy"]},
								then:
									{removeThat:true,sumScore:60,playAudio:"squash"}
							}
						]
					},{
						// Conditions
						do:[							
							{
								as:{type:["player"]},
								ifIsEmpty:{gameOver:"OUT OF BOARD!",playAudio:"fall"}
							},
							{as:{
								type:["player"]},
								ifCollidesWith:{type:["wall"]},
								then:{gameOver:"SMASHED TO A WALL!",playAudio:"explosion"}
							},
							{as:{
								type:["normalplayer"]},
								ifCollidesWith:{type:["enemy"]},
								then:{gameOver:"CAUGHT BY ENEMY!",playAudio:"lose"}
							}
						]
						}
					]
				},

				// Player cards - Base

				left:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:3,labelColor:PALETTE.yellow,do:ACTIONS.moveMazeLeft},
					{labelId:6,labelColor:PALETTE.yellow,do:ACTIONS.draw}
				]},
				right:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:1,labelColor:PALETTE.yellow,do:ACTIONS.moveMazeRight},
					{labelId:6,labelColor:PALETTE.yellow,do:ACTIONS.draw}
				]},
				up:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:0,labelColor:PALETTE.yellow,do:ACTIONS.moveMazeUp},
					{labelId:6,labelColor:PALETTE.yellow,do:ACTIONS.draw}
				]},
				down:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:2,labelColor:PALETTE.yellow,do:ACTIONS.moveMazeDown},
					{labelId:6,labelColor:PALETTE.yellow,do:ACTIONS.draw}
				]},
				go:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:5,labelColor:PALETTE.yellow,do:[
						{sumScore:-1},
						{sub:ACTIONS.mazeGo}
					]},
					{labelId:6,labelColor:PALETTE.yellow,do:ACTIONS.draw}
				]},
				
				// Player cards - Bonus

				powerup1:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:8,labelColor:PALETTE.green,do:ACTIONS.mazeGainPower},
					{labelId:2,labelColor:PALETTE.yellow,do:ACTIONS.moveMazeDown}
				]},
				powerup2:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:8,labelColor:PALETTE.green,do:ACTIONS.mazeGainPower},
					{labelId:2,labelColor:PALETTE.yellow,do:ACTIONS.moveMazeDown}
				]},
				powerup3:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:8,labelColor:PALETTE.green,do:ACTIONS.mazeGainPower},
					{labelId:2,labelColor:PALETTE.yellow,do:ACTIONS.moveMazeDown}
				]},
				powerup4:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:8,labelColor:PALETTE.green,do:ACTIONS.mazeGainPower},
					{labelId:2,labelColor:PALETTE.yellow,do:ACTIONS.moveMazeDown}
				]},
				
								
				// AI Cards

				pause:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:5,labelColor:PALETTE.gray}]},

				wall1:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:10,labelColor:PALETTE.blue,do:[
					{atRange:{x1:1,y1:1,x2:3,y2:1},spawn:["_wall"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				wall2:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:10,labelColor:PALETTE.blue,do:[
					{atRange:{x1:5,y1:1,x2:7,y2:1},spawn:["_wall"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				wall3:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:10,labelColor:PALETTE.blue,do:[
					{atRange:{x1:1,y1:7,x2:3,y2:7},spawn:["_wall"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				wall4:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:10,labelColor:PALETTE.blue,do:[
					{atRange:{x1:5,y1:7,x2:7,y2:7},spawn:["_wall"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				wall5:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:10,labelColor:PALETTE.blue,do:[
							{atRange:{x1:1,y1:1,x2:1,y2:3},spawn:["_wall"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				wall6:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:10,labelColor:PALETTE.blue,do:[
					{atRange:{x1:1,y1:5,x2:1,y2:7},spawn:["_wall"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				wall7:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:10,labelColor:PALETTE.blue,do:[
					{atRange:{x1:7,y1:5,x2:7,y2:7},spawn:["_wall"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				wall8:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:10,labelColor:PALETTE.blue,do:[
					{atRange:{x1:7,y1:1,x2:7,y2:3},spawn:["_wall"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				wall9:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:10,labelColor:PALETTE.blue,do:[
					{atRange:{x1:3,y1:3,x2:3,y2:5},spawn:["_wall"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				wall10:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:10,labelColor:PALETTE.blue,do:[
					{atRange:{x1:5,y1:3,x2:5,y2:5},spawn:["_wall"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				wall11:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:10,labelColor:PALETTE.blue,do:[
					{atRange:{x1:3,y1:4,x2:5,y2:4},spawn:["_wall"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				// Dots

				dots1:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:9,labelColor:PALETTE.yellow,do:[
					{atRange:{x1:4,y1:0,x2:4,y2:9},spawn:["_smalldot"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				dots2:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:9,labelColor:PALETTE.yellow,do:[
					{atRange:{x1:4,y1:5,x2:4,y2:8},spawn:["_smalldot"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				dots3:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:9,labelColor:PALETTE.yellow,do:[
					{atRange:{x1:0,y1:4,x2:2,y2:4},spawn:["_smalldot"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				dots4:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:9,labelColor:PALETTE.yellow,do:[
					{atRange:{x1:6,y1:4,x2:8,y2:4},spawn:["_smalldot"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo},
				]}]},

				dots5:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:9,labelColor:PALETTE.yellow,do:[
					{atRange:{x1:2,y1:2,x2:3,y2:2},spawn:["_smalldot"]},
					{at:{gridX:2,gridY:3},spawn:["_smalldot"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				dots6:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:9,labelColor:PALETTE.yellow,do:[
					{atRange:{x1:5,y1:2,x2:6,y2:2},spawn:["_smalldot"]},
					{at:{gridX:6,gridY:3},spawn:["_smalldot"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				dots7:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:9,labelColor:PALETTE.yellow,do:[
					{atRange:{x1:2,y1:6,x2:3,y2:6},spawn:["_smalldot"]},
					{at:{gridX:2,gridY:5},spawn:["_smalldot"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				dots8:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:9,labelColor:PALETTE.yellow,do:[
					{atRange:{x1:5,y1:6,x2:6,y2:6},spawn:["_smalldot"]},
					{at:{gridX:6,gridY:5},spawn:["_smalldot"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				dots9:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:9,labelColor:PALETTE.yellow,do:[
					{atRange:{x1:1,y1:0,x2:3,y2:0},spawn:["_smalldot"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				dots10:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:9,labelColor:PALETTE.yellow,do:[
					{atRange:{x1:5,y1:0,x2:7,y2:0},spawn:["_smalldot"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				dots11:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:9,labelColor:PALETTE.yellow,do:[
					{atRange:{x1:1,y1:8,x2:3,y2:8},spawn:["_smalldot"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				dots12:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:9,labelColor:PALETTE.yellow,do:[
					{atRange:{x1:5,y1:8,x2:7,y2:8},spawn:["_smalldot"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				dots13:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:9,labelColor:PALETTE.yellow,do:[
					{atRange:{x1:0,y1:1,x2:0,y2:3},spawn:["_smalldot"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				dots14:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:9,labelColor:PALETTE.yellow,do:[
					{atRange:{x1:0,y1:5,x2:0,y2:7},spawn:["_smalldot"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				dots15:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:9,labelColor:PALETTE.yellow,do:[
					{atRange:{x1:8,y1:1,x2:8,y2:3},spawn:["_smalldot"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				dots16:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:9,labelColor:PALETTE.yellow,do:[
					{atRange:{x1:8,y1:5,x2:8,y2:7},spawn:["_smalldot"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				// Enemies

				enemy1:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:2,gridY:2},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy2:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:4,gridY:2},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy3:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:6,gridY:2},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy4:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:2,gridY:6},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy5:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:4,gridY:6},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy6:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:6,gridY:6},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy7:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:2,gridY:4},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy8:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:6,gridY:4},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy9:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:0,gridY:4},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy10:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:8,gridY:4},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy11:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:4,gridY:0},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy12:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:4,gridY:8},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy13:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:2,gridY:0},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy14:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:0,gridY:2},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy15:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:0,gridY:6},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy16:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:2,gridY:8},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy17:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:6,gridY:0},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy18:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:8,gridY:2},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy19:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:8,gridY:6},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				enemy20:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:11,labelColor:PALETTE.purple,do:[
					{at:{gridX:6,gridY:8},spawn:["_enemy"]},
					{sub:ACTIONS.mazeLosePower},
					{sub:ACTIONS.mazeGo}
				]}]},

				
				// Board cards

				_smalldot:{size:CARDSIZES.small,labels:[{labelId:12,labelColor:PALETTE.yellow}],type:["board","smalldot"]},
				_largedot:{size:CARDSIZES.small,labels:[{labelId:13,labelColor:PALETTE.green}],type:["board","bonus"]},

				_playerright:{size:CARDSIZES.small,priority:5,labels:[{labelId:14,labelColor:PALETTE.yellow}],type:["board","player","normalplayer","normalplayerright","playerright"]},
				_playerup:{size:CARDSIZES.small,priority:5,labels:[{labelId:15,labelColor:PALETTE.yellow}],type:["board","player","normalplayer","normalplayerup","playerup"]},
				_playerleft:{size:CARDSIZES.small,priority:5,labels:[{labelId:16,labelColor:PALETTE.yellow}],type:["board","player","normalplayer","normalplayerleft","playerleft"]},
				_playerdown:{size:CARDSIZES.small,priority:5,labels:[{labelId:17,labelColor:PALETTE.yellow}],type:["board","player","normalplayer","normalplayerdown","playerdown"]},

				_powerplayerright:{size:CARDSIZES.small,priority:5,labels:[{labelId:14,labelColor:PALETTE.green}],type:["board","player","powerplayer","powerplayerright","playerright"]},
				_powerplayerup:{size:CARDSIZES.small,priority:5,labels:[{labelId:15,labelColor:PALETTE.green}],type:["board","player","powerplayer","powerplayerup","playerup"]},
				_powerplayerleft:{size:CARDSIZES.small,priority:5,labels:[{labelId:16,labelColor:PALETTE.green}],type:["board","player","powerplayer","powerplayerleft","playerleft"]},
				_powerplayerdown:{size:CARDSIZES.small,priority:5,labels:[{labelId:17,labelColor:PALETTE.green}],type:["board","player","powerplayer","powerplayerdown","playerdown"]},

				_wall:{size:CARDSIZES.small,priority:20,labels:[{labelId:19,labelColor:PALETTE.blue}],type:["board","wall","obstacle"]},
				_enemy:{size:CARDSIZES.small,priority:10,labels:[{labelId:18,labelColor:PALETTE.purple}],type:["board","enemy"]}
			}
		},

		{

			// A Cardcade racing game. This time I tried implementing a steering
			// wheel, drifting and turbo using the Cardcade system.

			id:"stuntgasracing",
			name:"Stunt Gas Racing",
			logoId:3,
			description:[
				"STEER! DRIFT! AND...","DON'T RUN OUT OF GAS!"
			],
			manual:[
				{format:"title",text:"How to play"},
				{format:"line",text:"Turn the steering wheel, drift, and sprint playing your hand of cards. Every time you draw a new card AI activates: the car moves back one space toward the first row, loses one unit of fuel, steers, and the road moves ahead."},
				{format:"line",text:"Green arrows will move the car one space regardless of the steer."},
				{format:"line",text:"Pick the fuel tanks on the road to fill up your car and add a bonus card to your discard pile, improving your driving skills."},
				{format:"title",text:"Steering the car"},
				{format:"line",text:"If the wheel is in the yellow zone the car will move one space sideways and the wheel will move one space to the center."},
				{format:"line",text:"If the wheel is in the red zone the car will move two spaces sideways and the wheel will move two spaces to the center."},
				{format:"title",text:"Game end"},
				{format:"line",text:"You lose when your car crashes on a wall, run out of gas, or the steering wheel goes out the game board."},
			],
			decks:{
				bonusDeck:[
					{card:"turbo",amount:2},
					{card:"rightDrift",amount:2},
					{card:"leftDrift",amount:2},
				],
				playerDeck:[
					{card:"steerLeft",amount:4},
					{card:"steerRight",amount:4},
					{card:"turbo",amount:4},
				],
				aiDeck:[
					{card:"scrollStage1",amount:2},
					{card:"scrollStage2",amount:2},
					{card:"scrollStage3",amount:2},
					{card:"scrollStageTunnel",amount:2},
					{card:"fuel1"},
					{card:"fuel2"},
					{card:"fuel3"},
				]
			},
			cards:{

				// Turn card

				_turncard:{size:CARDSIZES.normalDouble,type:["turnCard"],labels:[
					{
						// Preparation
						do:[
							{at:{gridX:4,gridY:8},spawn:["_nosteer"]},
							{atRange:{x1:2,y1:8,x2:3,y2:8},spawn:["_leftsteerdot"]},
							{atRange:{x1:5,y1:8,x2:6,y2:8},spawn:["_rightsteerdot"]},
							{atRange:{x1:0,y1:8,x2:1,y2:8},spawn:["_fastleftsteerdot"]},
							{atRange:{x1:7,y1:8,x2:8,y2:8},spawn:["_fastrightsteerdot"]},
							{atRange:{x1:0,y1:0,x2:0,y2:7},spawn:["_fueldot"]},
							{at:{gridX:4,gridY:8},spawn:["_steer"]},
							{atRange:{x1:1,y1:0,x2:1,y2:7},spawn:["_wall"]},
							{atRange:{x1:8,y1:0,x2:8,y2:7},spawn:["_wall"]},

							{runAI:{times:3,skipConditions:true}},
							{at:{gridX:0,gridY:7},spawn:["_fuel"]},
							{at:{gridX:4,gridY:0},spawn:["_car"]},

							{setScore:100}
						]
					},
					{
						// At turn end...
						do:[
							{
								as:{type:["car"]},
								ifCollidesWith:{type:["fueltank"]},
								then:
									{
										removeThat:true,
										playAudio:"bonus",
										earnCard:true,
										sumScore:50,
										sub:[
											{as:{type:["fuel"]},moveTo:{gridY:7}}
										]
									}
							},
						]
					},{
						// Conditions
						do:[
							{
								as:{type:["obstacle"]},
								ifCollidesWith:{type:["car"]},
								then:
									{gameOver:"YOUR CAR CRASHED!",playAudio:"explosion"}
							},
							{
								as:{type:["fuel"]},
								ifIsEmpty:{gameOver:"OUT OF GAS!",playAudio:"fall"}
							},
							{
								as:{type:["steer"]},
								ifIsEmpty:{gameOver:"CONTROLS BROKEN!",playAudio:"explosion"}
							},
						]
					}
				]},

				// Player cards - Base

				steerLeft:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:13,labelColor:PALETTE.yellow,do:ACTIONS.steerLeft},
					{labelId:6,labelColor:PALETTE.yellow,do:ACTIONS.draw}
				]},
				steerRight:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:12,labelColor:PALETTE.yellow,do:ACTIONS.steerRight},
					{labelId:6,labelColor:PALETTE.yellow,do:ACTIONS.draw}
				]},
				turbo:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:2,labelColor:PALETTE.green,do:[{as:{type:["car"]},into:{x1:1,y1:0,x2:8,y2:6},moveBy:{gridY:1}}]},
					{labelId:6,labelColor:PALETTE.yellow,do:ACTIONS.draw}
				]},
				rightDrift:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:1,labelColor:PALETTE.green,do:[{as:{type:["car"]},moveBy:{gridX:1}}]},
					{labelId:12,labelColor:PALETTE.yellow,do:ACTIONS.steerRight}
				]},
				leftDrift:{size:CARDSIZES.normalDouble,type:["playerAction"],labels:[
					{labelId:3,labelColor:PALETTE.green,do:[{as:{type:["car"]},moveBy:{gridX:-1}}]},
					{labelId:13,labelColor:PALETTE.yellow,do:ACTIONS.steerLeft}
				]},
				
				// Player cards - Bonus
				
								
				// AI Cards

				pause:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:5,labelColor:PALETTE.gray}]},
				scrollStageTunnel:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:0,labelColor:PALETTE.blue,do:[
					{sub:ACTIONS.moveCar},
					{as:{type:["scrolling"]},moveBy:{gridY:-1}},
					{at:{gridX:1,gridY:7},spawn:["_wall"]},
					{at:{gridX:8,gridY:7},spawn:["_wall"]},
					
				]}]},

				scrollStage1:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:0,labelColor:PALETTE.blue,do:[					
					{sub:ACTIONS.moveCar},
					{as:{type:["scrolling"]},moveBy:{gridY:-1}},
					{at:{gridX:1,gridY:7},spawn:["_wall"]},
					{at:{gridX:8,gridY:7},spawn:["_wall"]},

					{at:{gridX:3,gridY:7},spawn:["_wall"]},
					{at:{gridX:6,gridY:7},spawn:["_wall"]},
					
				]}]},
				
				scrollStage2:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:0,labelColor:PALETTE.blue,do:[
					{sub:ACTIONS.moveCar},
					{as:{type:["scrolling"]},moveBy:{gridY:-1}},
					{at:{gridX:1,gridY:7},spawn:["_wall"]},
					{at:{gridX:8,gridY:7},spawn:["_wall"]},

					{at:{gridX:4,gridY:7},spawn:["_wall"]},
					{at:{gridX:5,gridY:7},spawn:["_wall"]}
					
					
				]}]},
				scrollStage3:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:0,labelColor:PALETTE.green,do:[
					{sub:ACTIONS.moveCar},
					{as:{type:["scrolling"]},moveBy:{gridY:-1}},
					{at:{gridX:1,gridY:7},spawn:["_wall"]},
					{at:{gridX:8,gridY:7},spawn:["_wall"]},

					{at:{gridX:2,gridY:7},spawn:["_wall"]},
					{at:{gridX:7,gridY:7},spawn:["_wall"]},
					
				]}]},

				fuel1:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:0,labelColor:PALETTE.green,do:[
					{sub:ACTIONS.moveCar},
					{as:{type:["scrolling"]},moveBy:{gridY:-1}},
					{at:{gridX:1,gridY:7},spawn:["_wall"]},
					{at:{gridX:8,gridY:7},spawn:["_wall"]},

					{at:{gridX:7,gridY:7},spawn:["_fueltank"]}
				]}]},

				fuel2:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:0,labelColor:PALETTE.green,do:[
					{sub:ACTIONS.moveCar},
					{as:{type:["scrolling"]},moveBy:{gridY:-1}},
					{at:{gridX:1,gridY:7},spawn:["_wall"]},
					{at:{gridX:8,gridY:7},spawn:["_wall"]},

					{at:{gridX:2,gridY:7},spawn:["_fueltank"]}
				]}]},

				fuel3:{size:CARDSIZES.normalSingle,type:["ai"],labels:[{labelId:0,labelColor:PALETTE.green,do:[
					{sub:ACTIONS.moveCar},
					{as:{type:["scrolling"]},moveBy:{gridY:-1}},
					{at:{gridX:1,gridY:7},spawn:["_wall"]},
					{at:{gridX:8,gridY:7},spawn:["_wall"]},

					{at:{gridX:3,gridY:7},spawn:["_fueltank"]},
					{at:{gridX:4,gridY:7},spawn:["_wall"]},
					{at:{gridX:5,gridY:7},spawn:["_wall"]},
					{at:{gridX:6,gridY:7},spawn:["_fueltank"]}
				]}]},
				
				// Board cards

				_nosteer:{size:CARDSIZES.small,labels:[{labelId:12,labelColor:PALETTE.gray}],type:["board","ui"]},
				_leftsteerdot:{size:CARDSIZES.small,labels:[{labelId:25,labelColor:PALETTE.yellow}],type:["board","ui"]},
				_rightsteerdot:{size:CARDSIZES.small,labels:[{labelId:26,labelColor:PALETTE.yellow}],type:["board","ui"]},
				_fastleftsteerdot:{size:CARDSIZES.small,labels:[{labelId:25,labelColor:PALETTE.red}],type:["board","ui"]},
				_fastrightsteerdot:{size:CARDSIZES.small,labels:[{labelId:26,labelColor:PALETTE.red}],type:["board","ui"]},
				_fueldot:{size:CARDSIZES.small,labels:[{labelId:27,labelColor:PALETTE.green}],type:["board","ui"]},
				_steer:{size:CARDSIZES.small,priority:10,labels:[{labelId:20,labelColor:PALETTE.yellow}],type:["board","ui","steer"]},
				_fuel:{size:CARDSIZES.small,priority:10,labels:[{labelId:21,labelColor:PALETTE.green}],type:["board","ui","fuel"]},
				_fueltank:{size:CARDSIZES.small,labels:[{labelId:22,labelColor:PALETTE.green}],type:["board","scrolling","fueltank"]},
				_wall:{size:CARDSIZES.small,labels:[{labelId:24,labelColor:PALETTE.blue}],type:["board","scrolling","wall","obstacle"]},
				_car:{size:CARDSIZES.small,labels:[{labelId:23,labelColor:PALETTE.yellow}],type:["board","car"]},
			}
			
		}
		
	];
}