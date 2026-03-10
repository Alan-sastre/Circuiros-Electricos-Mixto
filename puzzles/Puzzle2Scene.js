class Puzzle2Scene extends Phaser.Scene {
  constructor() {
    super("Puzzle2Scene");
    this.completedCount = 0;
    this.completed = false;
    this.pieces = [];
    this.slots = {};
  }

  create() {
    this.cameras.main.setBackgroundColor("rgba(0,0,0,0)");
    this.createPuzzleBackground();
    this.createWorkbench();
    this.createBoard();
    this.createSlots();
    this.createPieces();
    this.createGuide();
    this.updateGuide();
  }

  createPuzzleBackground() {
    const sky = this.add.graphics();
    sky.fillGradientStyle(0x355f2f, 0x355f2f, 0x23441f, 0x23441f, 1);
    sky.fillRect(0, 0, 1000, 500);

    const grid = this.add.graphics();
    grid.lineStyle(1, 0x8fffb2, 0.14);
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
    traces.lineStyle(3, 0x64f09b, 0.22);
    for (let i = 0; i < 7; i += 1) {
      const x = 80 + i * 120;
      traces.beginPath();
      traces.moveTo(x, 0);
      traces.lineTo(x, 170 + i * 20);
      traces.lineTo(x + 24, 170 + i * 20);
      traces.lineTo(x + 24, 500);
      traces.strokePath();
    }

    const colors = [0x9cffcb, 0x7ae5ff, 0xc4ff94];
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
        x: orb.x + Phaser.Math.Between(-36, 36),
        y: orb.y + Phaser.Math.Between(-18, 18),
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
    panel.fillStyle(0xf2fff5, 0.42);
    panel.fillRoundedRect(45, 35, 910, 430, 30);
    panel.fillStyle(0xdcffe2, 0.5);
    panel.fillRoundedRect(58, 48, 884, 404, 26);
    panel.fillStyle(0xf7fff8, 0.58);
    panel.fillRoundedRect(70, 60, 860, 380, 22);
    panel.lineStyle(4, 0x7fc7ff, 0.85);
    panel.strokeRoundedRect(45, 35, 910, 430, 30);
    panel.lineStyle(2, 0x91d6ff, 0.35);
    panel.strokeRoundedRect(58, 48, 884, 404, 26);
  }

  createBoard() {
    const wire = this.add.graphics();
    wire.lineStyle(16, 0x5b2f0f, 0.94);
    wire.beginPath();
    wire.moveTo(160, 184);
    wire.lineTo(160, 120);
    wire.lineTo(210, 120);
    wire.moveTo(160, 316);
    wire.lineTo(160, 370);
    wire.lineTo(210, 370);
    wire.moveTo(210, 120);
    wire.lineTo(790, 120);
    wire.moveTo(210, 370);
    wire.lineTo(790, 370);
    wire.strokePath();
    wire.lineStyle(10, 0xfb8500, 1);
    wire.beginPath();
    wire.moveTo(160, 184);
    wire.lineTo(160, 120);
    wire.lineTo(210, 120);
    wire.moveTo(160, 316);
    wire.lineTo(160, 370);
    wire.lineTo(210, 370);
    wire.moveTo(210, 120);
    wire.lineTo(790, 120);
    wire.moveTo(210, 370);
    wire.lineTo(790, 370);
    wire.strokePath();
    wire.lineStyle(2, 0xffd9b0, 0.58);
    wire.beginPath();
    wire.moveTo(163, 183);
    wire.lineTo(163, 120);
    wire.lineTo(213, 120);
    wire.moveTo(163, 317);
    wire.lineTo(163, 370);
    wire.lineTo(213, 370);
    wire.moveTo(210, 117);
    wire.lineTo(790, 117);
    wire.moveTo(210, 367);
    wire.lineTo(790, 367);
    wire.strokePath();
    wire.fillStyle(0xd6e6f2, 1);
    wire.fillCircle(210, 120, 7);
    wire.fillCircle(210, 370, 7);
    wire.fillCircle(790, 120, 7);
    wire.fillCircle(790, 370, 7);

    this.drawBattery(160, 250);
  }

  createSlots() {
    this.slots.series = this.createSlot(350, 245, "series");
    this.slots.parallel = this.createSlot(570, 245, "parallel");
    this.slots.output = this.createSlot(790, 245, "output");
    this.drawSlotConnectors();
  }

  drawSlotConnectors() {
    const xList = [this.slots.series.x, this.slots.parallel.x, this.slots.output.x];
    const g = this.add.graphics();
    g.lineStyle(10, 0x5b2f0f, 0.94);
    g.beginPath();
    xList.forEach((x) => {
      g.moveTo(x, 120);
      g.lineTo(x, 199);
      g.moveTo(x, 291);
      g.lineTo(x, 370);
    });
    g.strokePath();
    g.lineStyle(6, 0xfb8500, 1);
    g.beginPath();
    xList.forEach((x) => {
      g.moveTo(x, 120);
      g.lineTo(x, 199);
      g.moveTo(x, 291);
      g.lineTo(x, 370);
    });
    g.strokePath();
    g.fillStyle(0xd6e6f2, 1);
    xList.forEach((x) => {
      g.fillCircle(x, 199, 6);
      g.fillCircle(x, 291, 6);
    });
  }

  createSlot(x, y, type) {
    const slot = this.add.container(x, y);
    slot.type = type;
    slot.filled = false;

    const glow = this.add.rectangle(0, 0, 164, 104, 0x6fd3ff, 0.1);
    const frame = this.add.rectangle(0, 0, 148, 88, 0x0f2f4c, 0.96);
    frame.setStrokeStyle(4, 0xdaf0ff, 0.65);
    const plate = this.add.rectangle(0, 0, 134, 74, 0x214d73, 0.94);
    plate.setStrokeStyle(2, 0x9dd9ff, 0.55);
    const leftTerminal = this.add.circle(-77, 0, 8, 0xd6e6f2, 1);
    const rightTerminal = this.add.circle(77, 0, 8, 0xd6e6f2, 1);
    leftTerminal.setStrokeStyle(2, 0x6f7f8f, 1);
    rightTerminal.setStrokeStyle(2, 0x6f7f8f, 1);
    const focus = this.add.rectangle(0, 0, 156, 96, 0x80f6ff, 0.2);
    focus.setStrokeStyle(3, 0xaff9ff, 0.95);
    focus.setAlpha(0);
    slot.add([glow, frame, plate, leftTerminal, rightTerminal, focus]);
    slot.focus = focus;

    const icon = this.add.graphics();
    icon.lineStyle(5, 0xffffff, 0.9);
    if (type === "series") {
      icon.strokeRect(-28, -16, 20, 32);
      icon.strokeRect(8, -16, 20, 32);
      icon.beginPath();
      icon.moveTo(-46, 0);
      icon.lineTo(-28, 0);
      icon.moveTo(28, 0);
      icon.lineTo(46, 0);
      icon.strokePath();
    }
    if (type === "parallel") {
      icon.beginPath();
      icon.moveTo(-36, -20);
      icon.lineTo(-36, 20);
      icon.moveTo(36, -20);
      icon.lineTo(36, 20);
      icon.moveTo(-36, -20);
      icon.lineTo(36, -20);
      icon.moveTo(-36, 20);
      icon.lineTo(36, 20);
      icon.moveTo(-12, -20);
      icon.lineTo(-12, 20);
      icon.moveTo(12, -20);
      icon.lineTo(12, 20);
      icon.strokePath();
    }
    if (type === "output") {
      icon.strokeCircle(0, -8, 22);
      icon.beginPath();
      icon.moveTo(-12, 22);
      icon.lineTo(12, 22);
      icon.strokePath();
    }
    slot.add(icon);
    return slot;
  }

  createPieces() {
    this.createPiece(280, 420, "parallel", 0x06d6a0);
    this.createPiece(570, 420, "output", 0xffd166);
    this.createPiece(860, 420, "series", 0x00bbf9);
  }

  createPiece(x, y, type, color) {
    const piece = this.add.container(x, y);
    piece.type = type;
    piece.startX = x;
    piece.startY = y;
    piece.placed = false;

    const shadow = this.add.rectangle(6, 8, 136, 86, 0x000000, 0.2);
    const body = this.add.rectangle(0, 0, 136, 86, color, 0.96);
    body.setStrokeStyle(4, 0xffffff, 0.78);
    const center = this.add.rectangle(0, 0, 120, 70, 0xffffff, 0.14);
    const shine = this.add.rectangle(-26, -24, 52, 12, 0xffffff, 0.2);
    const screwA = this.add.circle(-60, -35, 4, 0xdfe7ef, 1);
    const screwB = this.add.circle(60, -35, 4, 0xdfe7ef, 1);
    const screwC = this.add.circle(-60, 35, 4, 0xdfe7ef, 1);
    const screwD = this.add.circle(60, 35, 4, 0xdfe7ef, 1);
    const icon = this.add.graphics();
    icon.lineStyle(6, 0x0f1f31, 0.95);

    if (type === "series") {
      icon.strokeRect(-30, -16, 18, 32);
      icon.strokeRect(12, -16, 18, 32);
      icon.beginPath();
      icon.moveTo(-46, 0);
      icon.lineTo(-30, 0);
      icon.moveTo(30, 0);
      icon.lineTo(46, 0);
      icon.strokePath();
    }
    if (type === "parallel") {
      icon.beginPath();
      icon.moveTo(-34, -20);
      icon.lineTo(-34, 20);
      icon.moveTo(34, -20);
      icon.lineTo(34, 20);
      icon.moveTo(-34, -20);
      icon.lineTo(34, -20);
      icon.moveTo(-34, 20);
      icon.lineTo(34, 20);
      icon.moveTo(-11, -20);
      icon.lineTo(-11, 20);
      icon.moveTo(11, -20);
      icon.lineTo(11, 20);
      icon.strokePath();
    }
    if (type === "output") {
      icon.strokeCircle(0, -8, 20);
      icon.beginPath();
      icon.moveTo(-11, 20);
      icon.lineTo(11, 20);
      icon.strokePath();
    }

    const hit = this.add
      .rectangle(0, 0, 148, 96, 0xffffff, 0.001)
      .setInteractive({ useHandCursor: true });

    piece.add([
      shadow,
      body,
      center,
      shine,
      screwA,
      screwB,
      screwC,
      screwD,
      icon,
      hit,
    ]);
    piece.mainBody = body;
    this.pieces.push(piece);
    this.input.setDraggable(hit);

    hit.on("drag", (pointer) => {
      if (piece.placed || this.completed) {
        return;
      }
      piece.x = Phaser.Math.Clamp(pointer.worldX, 100, 900);
      piece.y = Phaser.Math.Clamp(pointer.worldY, 90, 440);
      this.updateSlotHighlights(piece);
      this.updateGuide();
    });

    hit.on("dragend", () => {
      if (piece.placed || this.completed) {
        return;
      }
      this.updateSlotHighlights(piece);
      const targetSlot = this.slots[piece.type];
      const distance = Phaser.Math.Distance.Between(
        piece.x,
        piece.y,
        targetSlot.x,
        targetSlot.y,
      );
      if (distance < 70 && !targetSlot.filled) {
        piece.placed = true;
        targetSlot.filled = true;
        this.completedCount += 1;
        this.tweens.add({
          targets: piece,
          x: targetSlot.x,
          y: targetSlot.y,
          scale: 0.88,
          duration: 240,
          ease: "Back.out",
        });
        this.tweens.add({
          targets: piece.mainBody,
          alpha: 0.9,
          duration: 240,
        });
        this.updateSlotHighlights(null);
        this.updateGuide();
        this.checkCompleted();
      } else {
        this.updateSlotHighlights(null);
        this.tweens.add({
          targets: piece,
          x: piece.startX,
          y: piece.startY,
          duration: 300,
          ease: "Quad.out",
          onUpdate: () => this.updateGuide(),
        });
      }
    });
  }

  updateSlotHighlights(activePiece) {
    Object.values(this.slots).forEach((slot) => {
      slot.focus.setAlpha(0);
    });
    if (!activePiece || activePiece.placed) {
      return;
    }
    const slot = this.slots[activePiece.type];
    if (!slot || slot.filled) {
      return;
    }
    const distance = Phaser.Math.Distance.Between(activePiece.x, activePiece.y, slot.x, slot.y);
    slot.focus.setAlpha(distance < 110 ? 0.9 : 0.25);
  }

  drawBattery(x, y) {
    const g = this.add.graphics();
    g.fillStyle(0x112548, 0.55);
    g.fillRoundedRect(x - 50, y - 66, 100, 132, 14);
    g.fillStyle(0x4361ee, 1);
    g.fillRoundedRect(x - 42, y - 58, 84, 116, 12);
    g.fillGradientStyle(0x7fa0ff, 0x7fa0ff, 0x324fc9, 0x324fc9, 1);
    g.fillRoundedRect(x - 38, y - 54, 60, 108, 10);
    g.fillStyle(0xef233c, 1);
    g.fillRoundedRect(x - 27, y - 45, 50, 28, 8);
    g.fillStyle(0xffffff, 1);
    g.fillRect(x - 7, y - 34, 14, 6);
    g.fillRect(x - 2, y - 40, 4, 18);
    g.fillStyle(0xffffff, 0.25);
    g.fillRoundedRect(x - 33, y - 50, 30, 8, 4);
    g.fillStyle(0xadb5bd, 1);
    g.fillCircle(x, y - 66, 7);
    g.fillCircle(x, y + 66, 7);
  }

  createGuide() {
    this.guide = this.add.text(0, 0, "👆🏻", { fontSize: "54px" }).setDepth(1000);
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
    const nextPiece = this.pieces.find((piece) => !piece.placed);
    if (!nextPiece) {
      return;
    }
    const slot = this.slots[nextPiece.type];
    const guideStartY = Phaser.Math.Clamp(nextPiece.y + 56, 64, 468);
    const guideTargetY = Phaser.Math.Clamp(slot.y + 56, 64, 468);
    this.guide.setPosition(nextPiece.x + 38, guideStartY).setAlpha(1);
    this.tweens.killTweensOf(this.guide);
    this.tweens.add({
      targets: this.guide,
      x: slot.x + 38,
      y: guideTargetY,
      yoyo: true,
      repeat: -1,
      duration: 760,
      ease: "Sine.inOut",
    });
  }

  checkCompleted() {
    if (this.completed || this.completedCount < 3) {
      return;
    }
    this.completed = true;
    this.launchConfetti();
    this.time.delayedCall(1700, () => this.scene.start("Puzzle3Scene"));
  }

  launchConfetti() {
    const colors = [0xff006e, 0x3a86ff, 0x8338ec, 0xfb5607, 0xffbe0b];
    for (let i = 0; i < 90; i += 1) {
      const x = Phaser.Math.Between(90, 910);
      const piece = this.add.ellipse(
        x,
        -25,
        Phaser.Math.Between(6, 12),
        Phaser.Math.Between(8, 14),
        Phaser.Utils.Array.GetRandom(colors),
      );
      this.tweens.add({
        targets: piece,
        y: Phaser.Math.Between(540, 680),
        x: x + Phaser.Math.Between(-130, 130),
        angle: Phaser.Math.Between(180, 720),
        alpha: { from: 1, to: 0.7 },
        duration: Phaser.Math.Between(1100, 2000),
        ease: "Cubic.in",
        onComplete: () => piece.destroy(),
      });
    }
  }
}
