class Puzzle1Scene extends Phaser.Scene {
  constructor() {
    super("Puzzle1Scene");
    this.connectionsDone = 0;
    this.completed = false;
    this.connectionState = {};
  }

  create() {
    this.cameras.main.setBackgroundColor("rgba(0,0,0,0)");
    this.createPuzzleBackground();
    this.createWorkbench();
    this.createCircuitBase();
    this.createMissingConnections();
    this.createGuide();
    this.updateGuide();
  }

  createPuzzleBackground() {
    const sky = this.add.graphics();
    sky.fillGradientStyle(0x214a74, 0x214a74, 0x173457, 0x173457, 1);
    sky.fillRect(0, 0, 1000, 500);

    const grid = this.add.graphics();
    grid.lineStyle(1, 0x6ec9ff, 0.16);
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
    traces.lineStyle(3, 0x3ebdff, 0.24);
    for (let i = 0; i < 8; i += 1) {
      const y = 58 + i * 52;
      traces.beginPath();
      traces.moveTo(0, y);
      traces.lineTo(220 + i * 45, y);
      traces.lineTo(220 + i * 45, y + 18);
      traces.lineTo(1000, y + 18);
      traces.strokePath();
    }

    const pulseColor = [0x7ae5ff, 0xa0ffdd, 0x8ebdff];
    for (let i = 0; i < 18; i += 1) {
      const orb = this.add.circle(
        Phaser.Math.Between(30, 970),
        Phaser.Math.Between(30, 470),
        Phaser.Math.Between(4, 8),
        Phaser.Utils.Array.GetRandom(pulseColor),
        Phaser.Math.FloatBetween(0.45, 0.85),
      );
      this.tweens.add({
        targets: orb,
        x: orb.x + Phaser.Math.Between(-34, 34),
        y: orb.y + Phaser.Math.Between(-16, 16),
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
    panel.fillStyle(0xf1fbff, 0.44);
    panel.fillRoundedRect(60, 45, 880, 410, 32);
    panel.fillStyle(0xd8f0ff, 0.5);
    panel.fillRoundedRect(72, 57, 856, 386, 28);
    panel.fillStyle(0xf8fdff, 0.58);
    panel.fillRoundedRect(84, 69, 832, 362, 24);
    panel.lineStyle(5, 0x75c8ff, 0.8);
    panel.strokeRoundedRect(60, 45, 880, 410, 32);
    panel.lineStyle(2, 0x8ecae6, 0.35);
    panel.strokeRoundedRect(72, 57, 856, 386, 28);

    const glow = this.add.graphics();
    glow.fillStyle(0x89f0ff, 0.09);
    glow.fillRoundedRect(80, 68, 840, 48, 24);
    glow.fillStyle(0xffffff, 0.06);
    glow.fillRoundedRect(100, 82, 380, 12, 6);

    const screws = [
      [92, 78],
      [908, 78],
      [92, 422],
      [908, 422],
    ];
    screws.forEach(([x, y]) => this.drawScrew(x, y));
  }

  createCircuitBase() {
    const boardShadow = this.add.rectangle(502, 254, 742, 262, 0x000000, 0.16);
    boardShadow.setDepth(-1.2);
    const board = this.add.rectangle(500, 248, 742, 262, 0x1f374e, 0.98);
    board.setStrokeStyle(4, 0xc9e8ff, 0.45);
    board.setDepth(-1.1);
    const boardInner = this.add.rectangle(500, 248, 710, 230, 0x162c40, 1);
    boardInner.setStrokeStyle(2, 0x7bc9ff, 0.25);
    boardInner.setDepth(-1);

    this.drawBattery(165, 255);
    this.drawSwitch(440, 250);
    this.drawBulb(760, 245, false);

    const wire = this.add.graphics();
    wire.lineStyle(18, 0x5c2f13, 0.95);
    wire.beginPath();
    wire.moveTo(760, 285);
    wire.lineTo(760, 360);
    wire.lineTo(160, 360);
    wire.lineTo(160, 285);
    wire.strokePath();
    wire.lineStyle(11, 0xff8a3d, 0.98);
    wire.beginPath();
    wire.moveTo(760, 285);
    wire.lineTo(760, 360);
    wire.lineTo(160, 360);
    wire.lineTo(160, 285);
    wire.strokePath();
    wire.lineStyle(3, 0xffd7b0, 0.6);
    wire.beginPath();
    wire.moveTo(764, 287);
    wire.lineTo(764, 356);
    wire.lineTo(164, 356);
    wire.lineTo(164, 287);
    wire.strokePath();
    wire.lineStyle(2, 0xffcf9a, 0.35);
    wire.beginPath();
    wire.moveTo(756, 289);
    wire.lineTo(756, 352);
    wire.lineTo(156, 352);
    wire.lineTo(156, 289);
    wire.strokePath();

    this.socketA = this.drawSocket(232, 230);
    this.socketB = this.drawSocket(368, 250);
    this.socketC = this.drawSocket(512, 250);
    this.socketD = this.drawSocket(690, 250);
  }

  createMissingConnections() {
    this.createCable("a", { x: 232, y: 230 }, this.socketB, 0x00d1ff);
    this.createCable("b", { x: 512, y: 250 }, this.socketD, 0xffd166);
  }

  createCable(id, anchor, target, color) {
    const cable = this.add.container(anchor.x, anchor.y);
    cable.id = id;
    cable.anchor = anchor;
    cable.target = target;
    cable.color = color;
    cable.connected = false;

    const line = this.add.graphics();
    const plug = this.add.circle(0, 0, 18, color, 0.95);
    plug.setStrokeStyle(4, 0xffffff, 0.95);
    const plugCap = this.add.circle(0, 0, 10, 0xe8f2ff, 0.85);
    plugCap.setStrokeStyle(2, 0x5a6470, 0.8);
    const plugCore = this.add.circle(0, 0, 4, 0x111b2a, 0.8);

    cable.add([line, plug, plugCap, plugCore]);
    cable.line = line;
    cable.plug = plug;
    cable.end = { x: anchor.x + 120, y: anchor.y + 30 };

    this.drawCable(cable);
    this.makeCableInteractive(cable);

    this.connectionState[id] = cable;
  }

  drawCable(cable) {
    cable.line.clear();
    cable.line.lineStyle(16, 0x1f1f1f, 0.6);
    cable.line.beginPath();
    cable.line.moveTo(0, 0);
    cable.line.lineTo(
      cable.end.x - cable.anchor.x,
      cable.end.y - cable.anchor.y,
    );
    cable.line.strokePath();
    cable.line.lineStyle(9, cable.color, 0.96);
    cable.line.beginPath();
    cable.line.moveTo(0, 0);
    cable.line.lineTo(
      cable.end.x - cable.anchor.x,
      cable.end.y - cable.anchor.y,
    );
    cable.line.strokePath();
    cable.line.lineStyle(2, 0xffffff, 0.22);
    cable.line.beginPath();
    cable.line.moveTo(0, -2);
    cable.line.lineTo(
      cable.end.x - cable.anchor.x,
      cable.end.y - cable.anchor.y - 2,
    );
    cable.line.strokePath();
    cable.plug.setPosition(
      cable.end.x - cable.anchor.x,
      cable.end.y - cable.anchor.y,
    );
  }

  makeCableInteractive(cable) {
    cable.plug.setInteractive({ useHandCursor: true });
    this.input.setDraggable(cable.plug);

    cable.plug.on("drag", (pointer) => {
      if (cable.connected || this.completed) {
        return;
      }
      cable.end.x = Phaser.Math.Clamp(pointer.worldX, 110, 890);
      cable.end.y = Phaser.Math.Clamp(pointer.worldY, 95, 400);
      this.drawCable(cable);
    });

    cable.plug.on("dragend", () => {
      if (cable.connected || this.completed) {
        return;
      }
      const distance = Phaser.Math.Distance.Between(
        cable.end.x,
        cable.end.y,
        cable.target.x,
        cable.target.y,
      );
      if (distance < 42) {
        cable.end.x = cable.target.x;
        cable.end.y = cable.target.y;
        cable.connected = true;
        this.connectionsDone += 1;
        this.tweens.add({
          targets: cable.plug,
          scale: { from: 1.25, to: 1 },
          duration: 220,
          ease: "Back.out",
        });
        cable.target.setFillStyle(0x8aff80, 1);
        this.drawCable(cable);
        this.updateGuide();
        this.checkCompleted();
      } else {
        this.tweens.add({
          targets: cable.end,
          x: cable.anchor.x + 120,
          y: cable.anchor.y + 30,
          duration: 280,
          ease: "Quad.out",
          onUpdate: () => this.drawCable(cable),
        });
      }
    });
  }

  drawSocket(x, y) {
    this.add.circle(x, y, 23, 0x000000, 0.2);
    const base = this.add.circle(x, y, 19, 0x0c1625, 0.96);
    base.setStrokeStyle(4, 0xdbe8ff, 0.45);
    const ring = this.add.circle(x, y, 12, 0x5c6773, 0.65);
    ring.setStrokeStyle(2, 0xcfd8e3, 0.5);
    this.add.circle(x - 5, y - 5, 6, 0xffffff, 0.18);
    this.add.circle(x + 5, y + 5, 5, 0x0a0f18, 0.55);
    this.add.circle(x, y, 4, 0x0a0f18, 0.9);
    return base;
  }

  drawBattery(x, y) {
    const g = this.add.graphics();
    g.fillStyle(0x0d213f, 0.55);
    g.fillRoundedRect(x - 60, y - 38, 122, 78, 16);
    g.fillStyle(0x3169d5, 1);
    g.fillRoundedRect(x - 52, y - 30, 105, 60, 12);
    g.fillGradientStyle(0x7ab2ff, 0x7ab2ff, 0x2357b8, 0x2357b8, 1);
    g.fillRoundedRect(x - 48, y - 26, 80, 52, 10);
    g.fillStyle(0xd31b38, 1);
    g.fillRoundedRect(x + 16, y - 24, 34, 48, 8);
    g.fillStyle(0xffffff, 1);
    g.fillRect(x - 8, y - 3, 18, 6);
    g.fillRect(x + 33, y - 10, 5, 20);
    g.fillRect(x + 28, y - 3, 18, 6);
    g.fillStyle(0xffffff, 0.28);
    g.fillRoundedRect(x - 44, y - 22, 42, 8, 4);
    g.fillStyle(0xadb5bd, 1);
    g.fillCircle(x - 62, y - 25, 8);
    g.fillCircle(x - 62, y + 25, 8);
    g.fillCircle(x + 62, y - 25, 8);
    g.fillCircle(x + 62, y + 25, 8);
    g.fillStyle(0x9affb2, 0.9);
    g.fillRoundedRect(x - 8, y + 10, 30, 8, 4);
    g.fillStyle(0xffffff, 0.2);
    g.fillRoundedRect(x - 45, y + 6, 64, 10, 4);
    this.drawScrew(x - 62, y - 25);
    this.drawScrew(x - 62, y + 25);
    this.drawScrew(x + 62, y - 25);
    this.drawScrew(x + 62, y + 25);
  }

  drawSwitch(x, y) {
    const g = this.add.graphics();
    g.fillStyle(0x5a6573, 0.95);
    g.fillRoundedRect(x - 72, y - 26, 144, 52, 14);
    g.fillGradientStyle(0x8f9ca8, 0x8f9ca8, 0x4e5661, 0x4e5661, 1);
    g.fillRoundedRect(x - 67, y - 22, 134, 44, 12);
    g.lineStyle(5, 0xffffff, 0.55);
    g.strokeRoundedRect(x - 72, y - 26, 144, 52, 14);
    g.fillStyle(0x212529, 1);
    g.fillRoundedRect(x - 24, y - 8, 52, 16, 8);
    g.fillStyle(0xffffff, 0.18);
    g.fillRoundedRect(x - 58, y - 16, 64, 8, 4);
    g.lineStyle(6, 0xced4da, 0.85);
    g.beginPath();
    g.moveTo(x - 22, y + 4);
    g.lineTo(x + 14, y - 11);
    g.strokePath();
    g.fillStyle(0xadb5bd, 1);
    g.fillCircle(x - 22, y + 4, 5);
    g.fillStyle(0xff6b6b, 0.95);
    g.fillCircle(x + 44, y + 1, 5);
    this.drawScrew(x - 58, y - 16);
    this.drawScrew(x + 58, y - 16);
    this.drawScrew(x - 58, y + 16);
    this.drawScrew(x + 58, y + 16);
  }

  drawBulb(x, y, lit) {
    if (this.bulbGroup) {
      this.bulbGroup.destroy(true);
    }
    const group = this.add.container(0, 0);
    const glow = this.add.circle(x, y - 10, 66, 0xfff08a, lit ? 0.52 : 0.06);
    const glass = this.add.circle(x, y - 10, 36, 0xffe791, lit ? 0.95 : 0.6);
    glass.setStrokeStyle(4, 0xfafcff, 0.88);
    const shine = this.add.ellipse(x - 12, y - 19, 14, 20, 0xffffff, 0.4);
    const filament = this.add.graphics();
    filament.lineStyle(3, 0xf7a600, lit ? 0.95 : 0.35);
    filament.beginPath();
    filament.moveTo(x - 10, y + 2);
    filament.lineTo(x - 2, y - 2);
    filament.lineTo(x + 6, y + 3);
    filament.strokePath();
    const cap = this.add.rectangle(x, y + 28, 32, 24, 0x535e69, 1);
    cap.setStrokeStyle(3, 0xadb5bd, 1);
    const neck = this.add.rectangle(x, y + 14, 18, 10, 0x7a8793, 1);
    neck.setStrokeStyle(2, 0xbac3cc, 0.85);
    const capLines = this.add.graphics();
    capLines.lineStyle(2, 0xe9ecef, 0.45);
    capLines.beginPath();
    capLines.moveTo(x - 13, y + 22);
    capLines.lineTo(x + 13, y + 22);
    capLines.moveTo(x - 13, y + 28);
    capLines.lineTo(x + 13, y + 28);
    capLines.moveTo(x - 13, y + 34);
    capLines.lineTo(x + 13, y + 34);
    capLines.strokePath();
    group.add([glow, glass, shine, filament, neck, cap, capLines]);
    this.bulbGroup = group;
  }

  drawScrew(x, y) {
    const screw = this.add.graphics();
    screw.fillStyle(0xd9dee5, 0.95);
    screw.fillCircle(x, y, 5);
    screw.lineStyle(1.5, 0x66707a, 0.8);
    screw.beginPath();
    screw.moveTo(x - 3, y);
    screw.lineTo(x + 3, y);
    screw.strokePath();
  }

  createGuide() {
    this.guide = this.add.text(0, 0, "👆🏻", { fontSize: "56px" }).setDepth(1000);
  }

  updateGuide() {
    if (this.completed) {
      this.tweens.add({
        targets: this.guide,
        alpha: 0,
        duration: 250,
      });
      return;
    }

    const first = this.connectionState.a;
    const second = this.connectionState.b;
    let tx = first.end.x;
    let ty = first.end.y;
    let targetX = first.target.x;
    let targetY = first.target.y;

    if (first.connected && !second.connected) {
      tx = second.end.x;
      ty = second.end.y;
      targetX = second.target.x;
      targetY = second.target.y;
    }

    const guideStartY = Phaser.Math.Clamp(ty + 48, 64, 468);
    const guideTargetY = Phaser.Math.Clamp(targetY + 48, 64, 468);
    this.guide.setPosition(tx + 35, guideStartY).setAlpha(1);

    this.tweens.killTweensOf(this.guide);
    this.tweens.add({
      targets: this.guide,
      x: targetX + 35,
      y: guideTargetY,
      yoyo: true,
      repeat: -1,
      duration: 800,
      ease: "Sine.inOut",
    });
  }

  checkCompleted() {
    if (this.connectionsDone < 2 || this.completed) {
      return;
    }
    this.completed = true;
    this.drawBulb(760, 245, true);
    this.launchConfetti();
    this.time.delayedCall(1700, () => this.scene.start("Puzzle2Scene"));
  }

  launchConfetti() {
    const colors = [0xff4d6d, 0xffbe0b, 0x80ed99, 0x4cc9f0, 0xb5179e];
    for (let i = 0; i < 85; i += 1) {
      const x = Phaser.Math.Between(130, 870);
      const piece = this.add.rectangle(
        x,
        -20,
        Phaser.Math.Between(6, 12),
        Phaser.Math.Between(8, 16),
        Phaser.Utils.Array.GetRandom(colors),
      );
      piece.rotation = Phaser.Math.FloatBetween(0, Math.PI);
      this.tweens.add({
        targets: piece,
        y: Phaser.Math.Between(520, 640),
        x: x + Phaser.Math.Between(-110, 110),
        rotation: piece.rotation + Phaser.Math.FloatBetween(3, 8),
        alpha: { from: 1, to: 0.7 },
        duration: Phaser.Math.Between(1200, 1900),
        ease: "Quad.in",
        onComplete: () => piece.destroy(),
      });
    }
  }
}
