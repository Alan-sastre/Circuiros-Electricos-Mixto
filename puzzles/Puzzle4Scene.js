class Puzzle4Scene extends Phaser.Scene {
  constructor() {
    super("Puzzle4Scene");
    this.completed = false;
    this.placedCount = 0;
    this.pieces = [];
    this.slots = {};
  }

  create() {
    this.cameras.main.setBackgroundColor("rgba(0,0,0,0)");
    this.createPuzzleBackground();
    this.createWorkbench();
    this.createMixedCircuitBoard();
    this.createSlots();
    this.createPieces();
    this.createGuide();
    this.updateGuide();
  }

  createPuzzleBackground() {
    const sky = this.add.graphics();
    sky.fillGradientStyle(0x294a72, 0x294a72, 0x163350, 0x163350, 1);
    sky.fillRect(0, 0, 1000, 500);

    const grid = this.add.graphics();
    grid.lineStyle(1, 0x87d8ff, 0.14);
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

    const particles = [0x9cecff, 0xb8ffe3, 0xd1deff];
    for (let i = 0; i < 20; i += 1) {
      const orb = this.add.circle(
        Phaser.Math.Between(40, 960),
        Phaser.Math.Between(40, 460),
        Phaser.Math.Between(4, 8),
        Phaser.Utils.Array.GetRandom(particles),
        Phaser.Math.FloatBetween(0.35, 0.75),
      );
      this.tweens.add({
        targets: orb,
        x: orb.x + Phaser.Math.Between(-26, 26),
        y: orb.y + Phaser.Math.Between(-16, 16),
        alpha: { from: orb.alpha, to: 0.1 },
        scale: { from: 1, to: 1.55 },
        yoyo: true,
        repeat: -1,
        duration: Phaser.Math.Between(900, 1800),
        ease: "Sine.inOut",
      });
    }
  }

  createWorkbench() {
    const panel = this.add.graphics();
    panel.fillStyle(0xecf8ff, 0.38);
    panel.fillRoundedRect(44, 30, 912, 440, 30);
    panel.fillStyle(0xd6edff, 0.5);
    panel.fillRoundedRect(58, 44, 884, 412, 26);
    panel.fillStyle(0xf7fdff, 0.58);
    panel.fillRoundedRect(72, 58, 856, 384, 22);
    panel.fillStyle(0xffffff, 0.22);
    panel.fillRoundedRect(84, 70, 832, 66, 20);
    panel.lineStyle(4, 0x8ed8ff, 0.86);
    panel.strokeRoundedRect(44, 30, 912, 440, 30);
    panel.lineStyle(2, 0x9fe2ff, 0.4);
    panel.strokeRoundedRect(58, 44, 884, 412, 26);
  }

  createMixedCircuitBoard() {
    const shadow = this.add.rectangle(504, 226, 770, 258, 0x000000, 0.2);
    const frame = this.add.rectangle(500, 220, 760, 248, 0x1b344a, 0.95);
    frame.setStrokeStyle(4, 0xd5eeff, 0.65);
    const rail = this.add.rectangle(500, 220, 722, 210, 0x12273a, 1);
    rail.setStrokeStyle(2, 0x6fc7ff, 0.35);
    const shineTop = this.add.rectangle(500, 112, 736, 26, 0xffffff, 0.08);
    const shineBottom = this.add.rectangle(500, 326, 736, 18, 0x85c8f3, 0.08);
    [shadow, frame, rail, shineTop, shineBottom].forEach((item) => item.setDepth(2));

    const bolts = [
      [132, 102],
      [500, 102],
      [868, 102],
      [132, 338],
      [500, 338],
      [868, 338],
    ];
    bolts.forEach(([x, y]) => {
      const b = this.add.circle(x, y, 7, 0xdce8f2, 1).setDepth(4);
      b.setStrokeStyle(2, 0x6f7f8f, 1);
    });

    this.drawWires();
    this.drawBattery(146, 220);
    this.drawLamp(848, 220);
  }

  drawWires() {
    const g = this.add.graphics();
    g.setDepth(3);
    g.lineStyle(10, 0x5a3214, 0.94);
    g.beginPath();
    g.moveTo(146, 150);
    g.lineTo(848, 150);
    g.moveTo(146, 290);
    g.lineTo(848, 290);
    g.moveTo(286, 150);
    g.lineTo(286, 290);
    g.moveTo(426, 150);
    g.lineTo(426, 290);
    g.moveTo(566, 150);
    g.lineTo(566, 290);
    g.moveTo(706, 150);
    g.lineTo(706, 290);
    g.strokePath();
    g.lineStyle(6, 0xff8d22, 1);
    g.beginPath();
    g.moveTo(146, 150);
    g.lineTo(848, 150);
    g.moveTo(146, 290);
    g.lineTo(848, 290);
    g.moveTo(286, 150);
    g.lineTo(286, 290);
    g.moveTo(426, 150);
    g.lineTo(426, 290);
    g.moveTo(566, 150);
    g.lineTo(566, 290);
    g.moveTo(706, 150);
    g.lineTo(706, 290);
    g.strokePath();
    g.fillStyle(0xd5e7f5, 1);
    [146, 286, 426, 566, 706, 848].forEach((x) => {
      g.fillCircle(x, 150, 5);
      g.fillCircle(x, 290, 5);
    });

    const pulsePoints = [
      [210, 150],
      [350, 150],
      [490, 150],
      [630, 150],
      [770, 150],
    ];
    pulsePoints.forEach(([x, y], i) => {
      const pulse = this.add.circle(x, y, 4, 0xfff1b5, 0.95).setDepth(4);
      this.tweens.add({
        targets: pulse,
        x: x + 70,
        alpha: { from: 1, to: 0.15 },
        repeat: -1,
        delay: i * 120,
        duration: 900,
        ease: "Sine.inOut",
        yoyo: true,
      });
    });
  }

  drawBattery(x, y) {
    const body = this.add.rectangle(x, y, 88, 132, 0x143155, 0.95);
    body.setStrokeStyle(3, 0xc7e3ff, 0.65);
    const core = this.add.rectangle(x, y + 2, 56, 92, 0x3f6df0, 1);
    core.setStrokeStyle(2, 0xaac6ff, 0.75);
    const gloss = this.add.rectangle(x - 12, y - 8, 20, 64, 0xffffff, 0.14);
    const plus = this.add.rectangle(x, y - 34, 20, 6, 0xffffff, 1);
    const plus2 = this.add.rectangle(x, y - 34, 6, 20, 0xffffff, 1);
    const charge = this.add.rectangle(x, y + 24, 42, 8, 0x9affb2, 1);
    const topPin = this.add.circle(x, y - 64, 6, 0xe8f1f8, 1);
    const bottomPin = this.add.circle(x, y + 64, 6, 0xe8f1f8, 1);
    [body, core, gloss, plus, plus2, charge, topPin, bottomPin].forEach((o) => o.setDepth(5));
  }

  drawLamp(x, y) {
    this.lampGlow = this.add.circle(x, y - 18, 56, 0xffee88, 0.08);
    const glass = this.add.circle(x, y - 18, 30, 0xfff4b1, 0.55);
    glass.setStrokeStyle(4, 0xffffff, 0.9);
    const glassShine = this.add.ellipse(x - 10, y - 30, 12, 18, 0xffffff, 0.35);
    const filament = this.add.graphics();
    filament.lineStyle(3, 0xd38a1f, 0.6);
    filament.beginPath();
    filament.moveTo(x - 10, y - 8);
    filament.lineTo(x - 3, y - 13);
    filament.lineTo(x + 4, y - 8);
    filament.strokePath();
    const neck = this.add.rectangle(x, y + 6, 20, 10, 0x76828d, 1);
    neck.setStrokeStyle(2, 0xc6d0d8, 0.8);
    const cap = this.add.rectangle(x, y + 20, 32, 24, 0x4b5561, 1);
    cap.setStrokeStyle(2, 0xbdc6cf, 0.9);
    const capLines = this.add.graphics();
    capLines.lineStyle(2, 0xe2e8ee, 0.45);
    capLines.beginPath();
    capLines.moveTo(x - 11, y + 14);
    capLines.lineTo(x + 11, y + 14);
    capLines.moveTo(x - 11, y + 20);
    capLines.lineTo(x + 11, y + 20);
    capLines.moveTo(x - 11, y + 26);
    capLines.lineTo(x + 11, y + 26);
    capLines.strokePath();
    [this.lampGlow, glass, glassShine, filament, neck, cap, capLines].forEach((o) => o.setDepth(6));
  }

  createSlots() {
    const defs = [
      { key: "r1", x: 286, y: 220, kind: "resistor", color: 0xffca3a },
      { key: "r2", x: 426, y: 220, kind: "resistor", color: 0xffca3a },
      { key: "c1", x: 566, y: 220, kind: "capacitor", color: 0x4cc9f0 },
      { key: "d1", x: 706, y: 220, kind: "diode", color: 0xff595e },
      { key: "q1", x: 496, y: 332, kind: "transistor", color: 0x8ac926 },
    ];
    defs.forEach((def) => {
      this.slots[def.key] = this.createSlot(def);
    });
  }

  createSlot(def) {
    const slot = this.add.container(def.x, def.y);
    slot.key = def.key;
    slot.kind = def.kind;
    slot.filled = false;
    slot.color = def.color;
    const halo = this.add.circle(0, 0, 55, def.color, 0.14);
    const pad = this.add.rectangle(0, 0, 94, 80, 0xffffff, 0.72);
    pad.setStrokeStyle(3, def.color, 0.72);
    const pinLeft = this.add.circle(-52, 0, 5, 0xd5e7f5, 1);
    const pinRight = this.add.circle(52, 0, 5, 0xd5e7f5, 1);
    const mark = this.add.graphics();
    const slotGlow = this.add.rectangle(0, -22, 64, 10, 0xffffff, 0.09);
    this.drawSymbol(mark, def.kind, def.color, 0.3);
    slot.add([halo, pad, pinLeft, pinRight, slotGlow, mark]);
    slot.halo = halo;
    slot.setDepth(4);
    return slot;
  }

  createPieces() {
    const defs = [
      { key: "d1", x: 192, y: 424, kind: "diode", color: 0xff595e },
      { key: "r1", x: 332, y: 424, kind: "resistor", color: 0xffca3a },
      { key: "q1", x: 472, y: 424, kind: "transistor", color: 0x8ac926 },
      { key: "c1", x: 612, y: 424, kind: "capacitor", color: 0x4cc9f0 },
      { key: "r2", x: 752, y: 424, kind: "resistor", color: 0xffca3a },
    ];
    defs.forEach((def) => this.createPiece(def));
  }

  createPiece(def) {
    const piece = this.add.container(def.x, def.y);
    piece.key = def.key;
    piece.kind = def.kind;
    piece.startX = def.x;
    piece.startY = def.y;
    piece.placed = false;
    piece.color = def.color;

    const shadow = this.add.rectangle(4, 7, 100, 84, 0x000000, 0.2);
    const body = this.add.rectangle(0, 0, 100, 84, def.color, 0.94);
    body.setStrokeStyle(4, 0xffffff, 0.82);
    const shine = this.add.rectangle(-20, -24, 36, 10, 0xffffff, 0.22);
    const screwA = this.add.circle(-40, -30, 3, 0xe8f1f8, 1);
    const screwB = this.add.circle(40, -30, 3, 0xe8f1f8, 1);
    const screwC = this.add.circle(-40, 30, 3, 0xe8f1f8, 1);
    const screwD = this.add.circle(40, 30, 3, 0xe8f1f8, 1);
    const symbol = this.add.graphics();
    this.drawSymbol(symbol, def.kind, 0x12314b, 1);
    this.drawComponentDetail(piece, def.kind);
    const hit = this.add
      .rectangle(0, 0, 106, 90, 0xffffff, 0.001)
      .setInteractive({ useHandCursor: true });
    piece.add([shadow, body, shine, screwA, screwB, screwC, screwD, symbol, hit]);
    piece.setDepth(10);
    this.pieces.push(piece);
    this.input.setDraggable(hit);

    hit.on("drag", (pointer) => {
      if (piece.placed || this.completed) {
        return;
      }
      piece.x = Phaser.Math.Clamp(pointer.worldX, 90, 910);
      piece.y = Phaser.Math.Clamp(pointer.worldY, 130, 446);
      this.updateGuide();
      this.updateSlotHighlight(piece);
    });

    hit.on("dragend", () => {
      if (piece.placed || this.completed) {
        return;
      }
      const slot = this.slots[piece.key];
      const d = Phaser.Math.Distance.Between(piece.x, piece.y, slot.x, slot.y);
      if (d < 66 && !slot.filled) {
        piece.placed = true;
        slot.filled = true;
        this.placedCount += 1;
        this.tweens.add({
          targets: piece,
          x: slot.x,
          y: slot.y,
          scale: 0.92,
          duration: 220,
          ease: "Back.out",
        });
        this.flashCorrect(slot.x, slot.y, piece.color);
        this.updateGuide();
        this.checkCompleted();
      } else {
        this.tweens.add({
          targets: piece,
          x: piece.startX,
          y: piece.startY,
          duration: 260,
          ease: "Quad.out",
          onUpdate: () => this.updateGuide(),
        });
      }
      this.updateSlotHighlight(null);
    });
  }

  drawComponentDetail(piece, kind) {
    if (kind === "resistor") {
      const bands = [
        this.add.rectangle(-12, 0, 6, 30, 0x4d2c91, 0.95),
        this.add.rectangle(0, 0, 6, 30, 0xe63946, 0.95),
        this.add.rectangle(12, 0, 6, 30, 0x2a9d8f, 0.95),
      ];
      piece.add(bands);
      return;
    }
    if (kind === "capacitor") {
      const capA = this.add.rectangle(-8, 0, 12, 40, 0xd8f3ff, 0.95);
      const capB = this.add.rectangle(8, 0, 12, 40, 0xd8f3ff, 0.95);
      capA.setStrokeStyle(2, 0x6bbbe7, 0.8);
      capB.setStrokeStyle(2, 0x6bbbe7, 0.8);
      piece.add([capA, capB]);
      return;
    }
    if (kind === "diode") {
      const tri = this.add.graphics();
      tri.fillStyle(0xd6f2ff, 0.95);
      tri.beginPath();
      tri.moveTo(-12, -16);
      tri.lineTo(-12, 16);
      tri.lineTo(8, 0);
      tri.closePath();
      tri.fillPath();
      const bar = this.add.rectangle(16, 0, 4, 34, 0xd6f2ff, 0.95);
      piece.add([tri, bar]);
      return;
    }
    if (kind === "transistor") {
      const can = this.add.circle(0, 0, 18, 0xd6f2ff, 0.95);
      can.setStrokeStyle(2, 0x7aa4bf, 0.85);
      const legA = this.add.rectangle(-8, 22, 3, 16, 0xe9f2f7, 0.95);
      const legB = this.add.rectangle(0, 22, 3, 16, 0xe9f2f7, 0.95);
      const legC = this.add.rectangle(8, 22, 3, 16, 0xe9f2f7, 0.95);
      piece.add([can, legA, legB, legC]);
    }
  }

  drawSymbol(g, kind, color, alpha) {
    g.clear();
    g.lineStyle(4, color, alpha);
    g.fillStyle(color, alpha);
    if (kind === "resistor") {
      g.beginPath();
      g.moveTo(-20, 0);
      g.lineTo(-14, -8);
      g.lineTo(-8, 8);
      g.lineTo(-2, -8);
      g.lineTo(4, 8);
      g.lineTo(10, -8);
      g.lineTo(16, 8);
      g.lineTo(22, 0);
      g.strokePath();
      g.beginPath();
      g.moveTo(-34, 0);
      g.lineTo(-20, 0);
      g.moveTo(22, 0);
      g.lineTo(34, 0);
      g.strokePath();
      return;
    }
    if (kind === "capacitor") {
      g.beginPath();
      g.moveTo(-10, -14);
      g.lineTo(-10, 14);
      g.moveTo(10, -14);
      g.lineTo(10, 14);
      g.moveTo(-30, 0);
      g.lineTo(-10, 0);
      g.moveTo(10, 0);
      g.lineTo(30, 0);
      g.strokePath();
      return;
    }
    if (kind === "diode") {
      g.beginPath();
      g.moveTo(-18, -12);
      g.lineTo(-18, 12);
      g.lineTo(6, 0);
      g.closePath();
      g.fillPath();
      g.beginPath();
      g.moveTo(12, -12);
      g.lineTo(12, 12);
      g.moveTo(-30, 0);
      g.lineTo(-18, 0);
      g.moveTo(12, 0);
      g.lineTo(30, 0);
      g.strokePath();
      return;
    }
    if (kind === "transistor") {
      g.strokeCircle(0, 0, 18);
      g.beginPath();
      g.moveTo(-26, 10);
      g.lineTo(-8, 2);
      g.moveTo(-4, 14);
      g.lineTo(10, -4);
      g.moveTo(0, -18);
      g.lineTo(0, -30);
      g.strokePath();
    }
  }

  updateSlotHighlight(activePiece) {
    Object.values(this.slots).forEach((slot) => slot.halo.setAlpha(0.14));
    if (!activePiece || activePiece.placed) {
      return;
    }
    const slot = this.slots[activePiece.key];
    if (!slot || slot.filled) {
      return;
    }
    const d = Phaser.Math.Distance.Between(activePiece.x, activePiece.y, slot.x, slot.y);
    slot.halo.setAlpha(d < 88 ? 0.46 : 0.24);
  }

  flashCorrect(x, y, color) {
    const ring = this.add.circle(x, y, 18, color, 0.24);
    ring.setStrokeStyle(4, color, 0.95);
    ring.setDepth(15);
    this.tweens.add({
      targets: ring,
      scale: 2,
      alpha: 0,
      duration: 340,
      ease: "Quad.out",
      onComplete: () => ring.destroy(),
    });
    for (let i = 0; i < 8; i += 1) {
      const dot = this.add.circle(x, y, 4, color, 1).setDepth(15);
      const a = Phaser.Math.DegToRad(i * 45);
      this.tweens.add({
        targets: dot,
        x: x + Math.cos(a) * 34,
        y: y + Math.sin(a) * 34,
        alpha: 0,
        duration: 280,
        ease: "Quad.out",
        onComplete: () => dot.destroy(),
      });
    }
  }

  createGuide() {
    this.guide = this.add.text(0, 0, "👆🏻", { fontSize: "56px" }).setDepth(1000);
  }

  updateGuide() {
    if (this.completed) {
      this.tweens.add({ targets: this.guide, alpha: 0, duration: 220 });
      return;
    }
    const nextPiece = this.pieces.find((piece) => !piece.placed);
    if (!nextPiece) {
      return;
    }
    const slot = this.slots[nextPiece.key];
    this.guide.setPosition(nextPiece.x + 30, nextPiece.y + 60).setAlpha(1);
    this.tweens.killTweensOf(this.guide);
    this.tweens.add({
      targets: this.guide,
      x: slot.x + 30,
      y: slot.y + 60,
      scale: { from: 1, to: 1.08 },
      angle: { from: -6, to: 6 },
      yoyo: true,
      repeat: -1,
      duration: 720,
      ease: "Sine.inOut",
    });
    this.updateSlotHighlight(nextPiece);
  }

  checkCompleted() {
    if (this.completed || this.placedCount < 5) {
      return;
    }
    this.completed = true;
    this.tweens.add({
      targets: this.lampGlow,
      alpha: 0.65,
      duration: 320,
      ease: "Sine.out",
    });
    this.launchConfetti();
    this.time.delayedCall(1400, () => this.showFinalMessage());
  }

  showFinalMessage() {
    Swal.fire({
      title: "¡Felicitaciones!",
      text: "¡Completaste todos los puzzles!",
      icon: "success",
      confirmButtonText: "Volver a jugar",
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: {
        popup: "custom-popup-class",
        title: "custom-title-class",
        htmlContainer: "custom-content-class",
        confirmButton: "custom-confirm-button-class",
        container: "custom-container-class",
      },
    }).then(() => {
      this.scene.start("Puzzle1Scene");
    });
  }

  launchConfetti() {
    const colors = [0xff595e, 0x1982c4, 0xffca3a, 0x8ac926];
    for (let i = 0; i < 80; i += 1) {
      const x = Phaser.Math.Between(120, 880);
      const piece = this.add.circle(
        x,
        -20,
        Phaser.Math.Between(4, 8),
        Phaser.Utils.Array.GetRandom(colors),
      );
      this.tweens.add({
        targets: piece,
        y: Phaser.Math.Between(520, 620),
        x: x + Phaser.Math.Between(-120, 120),
        alpha: { from: 1, to: 0.6 },
        duration: Phaser.Math.Between(1000, 1700),
        ease: "Quad.in",
        onComplete: () => piece.destroy(),
      });
    }
  }
}
