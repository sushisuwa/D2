class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "Dungeon Entrance");
    }

    onEnter() {

        let list = this.add.text(this.w * 0.3, this.w * 0.3, "📝 grocery list")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Hmm, someone's grocery list..click to read"))
            .on('pointerdown', () => {
                this.showMessage("-Milk\n-Eggs\n-Butter\nInteresting..");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 Door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Click to Progress.");
            })
            .on('pointerdown', () => {
                    this.showMessage("*squeak*");
                    this.gotoScene('demo2');
            })

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "Dungeon Tunnel");
    }
    onEnter() {
        this.add.text(this.w * 0.17, this.w * 0.1, "You come to a divide in the road...")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Choose wisely..");
            })

        let leftPath = this.add.text(this.w * 0.15, this.w * 0.2, 'Left Path ⬅️')
        .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('Walk down the left path');
            })
            .on('pointerdown', () => this.gotoScene('demo4'));

        let rightPath = this.add.text(this.w * 0.45, this.w * 0.2, '➡️ Right Path')
        .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('Walk down the right path');
            })
            .on('pointerdown', () => this.gotoScene('demo3'));
    }
}

class Demo3 extends AdventureScene {
    constructor() {
        super("demo3", "Secret Stash!");
    }
    onEnter() {
        let bucket = this.add.text(this.w * 0.3, this.w * 0.25, "🚰 bucket")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("This could come in handy later...\nClick to pick up.");
            })
            .on('pointerdown', () => {
                this.gainItem('bucket');
                this.tweens.add({
                    targets: bucket,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => bucket.destroy()
                });
            })

        this.add.text(this.w * 0.05, this.w * 0.5,"go back")
            .setFontSize(this.s * 1)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("This is a dead end...click to go back");
            })
            .on('pointerdown', () => this.gotoScene('demo2'));
    }
}

class Demo4 extends AdventureScene {
    constructor() {
        super("demo4", "Witch's Lair");
    }
    onEnter() {
        let witch = this.add.text(this.w * 0.3, this.w * 0.25, "witch")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You'll never catch me!");
                this.tweens.add({
                    targets: witch,
                    alpha: {from: 1, to: 0},
                    duration: 200,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500,
                    alpha: {from: 0, to: 1},
                    duration: 400,
                });
            })
            .on('pointerdown', () => {
                if(this.hasItem('bucket')){
                    this.showMessage("Ah! I'm melting!!");
                    this.gotoScene('outro');
                    this.tweens.add({
                        targets: witch,
                        y: `-=${2 * this.s}`,
                        alpha: { from: 1, to: 0 },
                        duration: 500,
                        onComplete: () => witch.destroy()
                    });
                }else{
                    this.showMessage("Better luck next time");
                    this.gotoScene('bad');
                }
            })

        this.add.text(this.w * 0.05, this.w * 0.5,"go back")
            .setFontSize(this.s * 1)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("This is a dead end...click to go back");
            })
            .on('pointerdown', () => this.gotoScene('demo2'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "You've arrived at your destination, but you're confused...\nThis is not the grocery store...").setFontSize(50);
        this.add.text(50,150, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

class Bad extends Phaser.Scene {
    constructor() {
        super('bad');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Demo1, Demo2, Demo3, Demo4, Bad, Outro],
    title: "Adventure Game",
});

