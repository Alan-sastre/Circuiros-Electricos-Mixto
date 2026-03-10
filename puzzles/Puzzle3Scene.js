class Puzzle3Scene extends Phaser.Scene {
  constructor() {
    super("Puzzle3Scene");
    this.completed = false;
    this.switches = [];
    this.lamps = [];
  }

  create() {
    this.cameras.main.setBackgroundColor("rgba(0,0,0,0)");
    this.createPuzzleBackground();
    this.createWorkbench();
    this.createCircuit();
    this.createGuide();
    this.updateGuide();
  }

  createPuzzleBackground() {
    const sky = this.add.graphics();
    sky.fillGradientStyle(0x5a355f, 0x5a355f, 0x3d2142, 0x3d2142, 1);
    sky.fillRect(0, 0, 1000, 500);

    const grid = this.add.graphics();
    grid.lineStyle(1, 0xe4a7ff, 0.14);
    for (let x = 0; x <= 1000; x += 50) {
      grid.beginPath();
      grid.moveTo(x, 0);
      grid.lineTo(x, 500);
      grid.strokePath();
    }
    for (let y = 0; y <= 500; y += 50) {
      grid.beginPath();
      grid.moveTo(0, y);
      grid.lineTo(1000, y);
      grid.strokePath();
    }

    const traces = this.add.graphics();
    traces.lineStyle(3, 0xd680ff, 0.22);
    for (let i = 0; i < 8; i += 1) {
      const y = 42 + i * 56;
      traces.beginPath();
      traces.moveTo(0, y);
      traces.lineTo(140 + i * 70, y);
      traces.lineTo(140 + i * 70, y + 26);
      traces.lineTo(1000, y + 26);
      traces.strokePath();
    }

    const colors = [0xf1b0ff, 0xffc6e9, 0x9ad5ff];
    for (let i = 0; i < 18; i += 1) {
      const orb = this.add.circle(
        Phaser.Math.Between(30, 970),
        Phaser.Math.Between(30, 470),
        Phaser.Math.Between(4, 8),
        Phaser.Utils.Array.GetRandom(colors),
        Phaser.Math.FloatBetween(0.42, 0.82),
      );
      this.tweens.add({
        targets: orb,
        y: orb.y + Phaser.Math.Between(-20, 20),
        x: orb.x + Phaser.Math.Between(-34, 34),
        alpha: { from: orb.alpha, to: 0.1 },
        scale: { from: 1, to: 1.6 },
        yoyo: true,
        repeat: -1,
        duration: Phaser.Math.Between(900, 1800),
        ease: "Sine.inOut",
      });
    }
  }

  createWorkbench() {
    const panel = this.add.graphics();
    panel.fillStyle(0xfff1ff, 0.42);
    panel.fillRoundedRect(50, 40, 900, 420, 34);
    panel.fillStyle(0xf9dcff, 0.48);
    panel.fillRoundedRect(63, 53, 874, 394, 30);
    panel.fillStyle(0xfff6ff, 0.56);
    panel.fillRoundedRect(76, 66, 848, 368, 26);
    panel.lineStyle(5, 0x79c8ff, 0.85);
    panel.strokeRoundedRect(50, 40, 900, 420, 34);
    panel.lineStyle(2, 0x8fd5ff, 0.35);
    panel.strokeRoundedRect(63, 53, 874, 394, 30);
  }

  createCircuit() {
    this.drawBattery(185, 250);

    const wire = this.add.graphics();
    wire.lineStyle(16, 0x5f300d, 0.95);
    wire.beginPath();
    wire.moveTo(185, 176);
    wire.lineTo(185, 120);
    wire.lineTo(250, 120);
    wire.moveTo(185, 324);
    wire.lineTo(185, 380);
    wire.lineTo(250, 380);
    wire.moveTo(250, 120);
    wire.lineTo(750, 120);
    wire.moveTo(250, 380);
    wire.lineTo(750, 380);
    wire.moveTo(350, 120);
    wire.lineTo(350, 380);
    wire.moveTo(550, 120);
    wire.lineTo(550, 380);
    wire.moveTo(750, 120);
    wire.lineTo(750, 380);
    wire.strokePath();
    wire.lineStyle(10, 0xf77f00, 1);
    wire.beginPath();
    wire.moveTo(185, 176);
    wire.lineTo(185, 120);
    wire.lineTo(250, 120);
    wire.moveTo(185, 324);
    wire.lineTo(185, 380);
    wire.lineTo(250, 380);
    wire.moveTo(250, 120);
    wire.lineTo(750, 120);
    wire.moveTo(250, 380);
    wire.lineTo(750, 380);
    wire.moveTo(350, 120);
    wire.lineTo(350, 380);
    wire.moveTo(550, 120);
    wire.lineTo(550, 380);
    wire.moveTo(750, 120);
    wire.lineTo(750, 380);
    wire.strokePath();
    wire.lineStyle(2, 0xffdbb8, 0.56);
    wire.beginPath();
    wire.moveTo(188, 175);
    wire.lineTo(188, 120);
    wire.lineTo(253, 120);
    wire.moveTo(188, 325);
    wire.lineTo(188, 380);
    wire.lineTo(253, 380);
    wire.moveTo(250, 117);
    wire.lineTo(750, 117);
    wire.moveTo(250, 377);
    wire.lineTo(750, 377);
    wire.moveTo(753, 120);
    wire.lineTo(753, 380);
    wire.moveTo(553, 120);
    wire.lineTo(553, 380);
    wire.moveTo(353, 120);
    wire.lineTo(353, 380);
    wire.strokePath();
    wire.fillStyle(0xd6e6f2, 1);
    wire.fillCircle(250, 120, 7);
    wire.fillCircle(250, 380, 7);
    wire.fillCircle(750, 120, 7);
    wire.fillCircle(750, 380, 7);

    this.createBranch(350, 250, 0);
    this.createBranch(550, 250, 1);
    this.createBranch(750, 250, 2);
  }

  createBranch(x, y, index) {
    const link = this.add.graphics();
    link.lineStyle(8, 0x5f300d, 0.94);
    link.beginPath();
    link.moveTo(x, y + 90);
    link.lineTo(x - 8, y + 90);
    link.strokePath();
    link.lineStyle(5, 0xf77f00, 1);
    link.beginPath();
    link.moveTo(x, y + 90);
    link.lineTo(x - 8, y + 90);
    link.strokePath();
    link.fillStyle(0xd6e6f2, 1);
    link.fillCircle(x - 8, y + 90, 5);

    const sw = this.add.container(x - 62, y + 90);
    sw.state = false;
    sw.index = index;

    const shadow = this.add.rectangle(4, 5, 116, 60, 0x000000, 0.18);
    const plate = this.add.roundRectangle
      ? this.add.roundRectangle(0, 0, 112, 56, 12, 0xc8d4e0, 1)
      : this.add.rectangle(0, 0, 112, 56, 0xc8d4e0, 1);
    if (plate.setStrokeStyle) {
      plate.setStrokeStyle(4, 0xf8fcff, 0.85);
    }
    const groove = this.add.rectangle(0, 0, 92, 36, 0x8d98a5, 1);
    groove.setStrokeStyle(2, 0x6f7a86, 0.8);
    const pivot = this.add.circle(-18, 0, 8, 0x4a5560, 1);
    pivot.setStrokeStyle(2, 0xdde5ed, 0.8);
    const arm = this.add
      .rectangle(-18, 0, 58, 8, 0xeff4f9, 1)
      .setOrigin(0.1, 0.5);
    arm.rotation = -0.45;
    const led = this.add.circle(32, 0, 7, 0xff6b7a, 1);
    led.setStrokeStyle(2, 0xffffff, 0.65);
    const hit = this.add
      .rectangle(0, 0, 116, 62, 0xffffff, 0.001)
      .setInteractive({ useHandCursor: true });

    sw.add([shadow, plate, groove, pivot, arm, led, hit]);
    sw.arm = arm;
    sw.led = led;
    this.switches.push(sw);

    this.createLamp(x, y - 48, index);

    hit.on("pointerdown", () => {
      if (this.completed) {
        return;
      }
      sw.state = !sw.state;
      this.tweens.add({
        targets: arm,
        rotation: sw.state ? 0.45 : -0.45,
        duration: 180,
        ease: "Sine.out",
      });
      sw.led.setFillStyle(sw.state ? 0x90ff80 : 0xff6b7a, 1);
      this.updateLamp(index, sw.state);
      this.updateGuide();
      this.checkCompleted();
    });
  }

  createLamp(x, y, index) {
    const lead = this.add.graphics();
    lead.lineStyle(7, 0x5f300d, 0.94);
    lead.beginPath();
    lead.moveTo(x, y - 10);
    lead.lineTo(x, y - 40);
    lead.strokePath();
    lead.lineStyle(4, 0xf77f00, 1);
    lead.beginPath();
    lead.moveTo(x, y - 10);
    lead.lineTo(x, y - 40);
    lead.strokePath();
    lead.fillStyle(0xd6e6f2, 1);
    lead.fillCircle(x, y - 40, 5);

    const lamp = this.add.container(x, y);
    lamp.isOn = false;

    const glow = this.add.circle(0, -10, 62, 0xfff08a, 0.04);
    const glass = this.add.circle(0, -10, 32, 0xfff4b1, 0.54);
    glass.setStrokeStyle(4, 0xffffff, 0.9);
    const filament = this.add.graphics();
    filament.lineStyle(3, 0xe39d2d, 0.45);
    filament.beginPath();
    filament.moveTo(-10, -2);
    filament.lineTo(-2, -8);
    filament.lineTo(6, -2);
    filament.strokePath();
    const shine = this.add.ellipse(-11, -22, 13, 18, 0xffffff, 0.35);
    const neck = this.add.rectangle(0, 18, 20, 10, 0x7b8793, 1);
    neck.setStrokeStyle(2, 0xc4ccd4, 0.9);
    const cap = this.add.rectangle(0, 33, 34, 22, 0x495057, 1);
    cap.setStrokeStyle(3, 0xadb5bd, 1);
    const capLines = this.add.graphics();
    capLines.lineStyle(2, 0xe9ecef, 0.45);
    capLines.beginPath();
    capLines.moveTo(-13, 28);
    capLines.lineTo(13, 28);
    capLines.moveTo(-13, 33);
    capLines.lineTo(13, 33);
    capLines.moveTo(-13, 38);
    capLines.lineTo(13, 38);
    capLines.strokePath();

    lamp.add([glow, glass, filament, shine, neck, cap, capLines]);
    lamp.glow = glow;
    lamp.glass = glass;
    lamp.filament = filament;
    this.lamps[index] = lamp;
  }

  updateLamp(index, isOn) {
    const lamp = this.lamps[index];
    lamp.isOn = isOn;
    this.tweens.add({
      targets: lamp.glow,
      alpha: isOn ? 0.56 : 0.04,
      duration: 200,
      ease: "Sine.out",
    });
    this.tweens.add({
      targets: lamp.glass,
      alpha: isOn ? 0.98 : 0.5,
      duration: 200,
      ease: "Sine.out",
    });
    lamp.filament.clear();
    lamp.filament.lineStyle(3, 0xe39d2d, isOn ? 0.95 : 0.35);
    lamp.filament.beginPath();
    lamp.filament.moveTo(-10, -2);
    lamp.filament.lineTo(-2, -8);
    lamp.filament.lineTo(6, -2);
    lamp.filament.strokePath();
  }

  drawBattery(x, y) {
    const g = this.add.graphics();
    g.fillStyle(0x102445, 0.54);
    g.fillRoundedRect(x - 53, y - 74, 106, 148, 16);
    g.fillStyle(0x3f37c9, 1);
    g.fillRoundedRect(x - 45, y - 66, 90, 132, 14);
    g.fillGradientStyle(0x7983ff, 0x7983ff, 0x2d2aa3, 0x2d2aa3, 1);
    g.fillRoundedRect(x - 40, y - 62, 62, 124, 11);
    g.fillStyle(0xef233c, 1);
    g.fillRoundedRect(x - 30, y - 50, 56, 32, 8);
    g.fillStyle(0xffffff, 1);
    g.fillRect(x - 9, y - 38, 18, 6);
    g.fillRect(x - 3, y - 44, 6, 18);
    g.fillStyle(0xffffff, 0.24);
    g.fillRoundedRect(x - 35, y - 56, 34, 8, 4);
    g.fillStyle(0xadb5bd, 1);
    g.fillCircle(x, y - 74, 8);
    g.fillCircle(x, y + 74, 8);
  }

  createGuide() {
    this.guide = this.add.text(0, 0, "👆🏻", { fontSize: "54px" }).setDepth(1000);
  }

  updateGuide() {
    if (this.completed) {
      this.tweens.add({
        targets: this.guide,
        alpha: 0,
        duration: 240,
      });
      return;
    }
    const nextSwitch =
      this.switches.find((sw) => !sw.state) || this.switches[0];
    const guideStartY = Phaser.Math.Clamp(nextSwitch.y + 54, 64, 468);
    this.guide.setPosition(nextSwitch.x + 28, guideStartY).setAlpha(1);
    this.tweens.killTweensOf(this.guide);
    this.tweens.add({
      targets: this.guide,
      y: Phaser.Math.Clamp(nextSwitch.y + 74, 64, 468),
      yoyo: true,
      repeat: -1,
      duration: 500,
      ease: "Sine.inOut",
    });
  }

  checkCompleted() {
    const allOn = this.switches.every((sw) => sw.state);
    if (!allOn || this.completed) {
      return;
    }
    this.completed = true;
    this.launchConfetti();
    const stars = this.add
      .text(500, 80, "🏆✨🤖✨", { fontSize: "76px" })
      .setOrigin(0.5);
    this.tweens.add({
      targets: stars,
      y: 110,
      alpha: { from: 0, to: 1 },
      scale: { from: 0.5, to: 1 },
      duration: 520,
      ease: "Back.out",
    });
    this.time.delayedCall(2600, () => this.scene.start("Puzzle4Scene"));
  }

  launchConfetti() {
    const colors = [0xff4d6d, 0xffbe0b, 0x80ed99, 0x4cc9f0, 0xb5179e];
    for (let i = 0; i < 95; i += 1) {
      const x = Phaser.Math.Between(100, 900);
      const piece = this.add.rectangle(
        x,
        -25,
        Phaser.Math.Between(6, 12),
        Phaser.Math.Between(8, 16),
        Phaser.Utils.Array.GetRandom(colors),
      );
      this.tweens.add({
        targets: piece,
        y: Phaser.Math.Between(540, 700),
        x: x + Phaser.Math.Between(-150, 150),
        angle: Phaser.Math.Between(240, 900),
        alpha: { from: 1, to: 0.7 },
        duration: Phaser.Math.Between(1200, 2100),
        ease: "Quart.in",
        onComplete: () => piece.destroy(),
      });
    }
  }
}
