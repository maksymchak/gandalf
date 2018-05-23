var renderStatistics = function(ctx, names, times) {
  var cloudX = 100;
  var cloudY = 10;
  var cloudWidth = 420;
  var cloudHeight = 270;

  var textFont = "16px PT Mono";
  var textColor = "black";
  var you = "Вы";

  var columnWidth = 40;
  var columnMaxHeight = 150;
  var columnStep = 50;

  var drawCloud = function() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(cloudX + 10, cloudY + 10, cloudWidth, cloudHeight);

    ctx.fillStyle = "white";
    ctx.fillRect(cloudX, cloudY, cloudWidth, cloudHeight);

    ctx.font = textFont;
    ctx.fillStyle = textColor;
    ctx.fillText("Ура, вы победили!", cloudX + 30, cloudY + 30);
    ctx.fillText("Список результатов:", cloudX + 30, cloudY + 50);
  };

  var drawHistogram = function() {
    var maxTime = Math.max.apply(null, times);

    for (var i = 0; i <= names.length; i++) {
      var columnHeight = times[i] / maxTime * columnMaxHeight;
      var columnLeft = cloudX + 30 + i * (columnStep + columnWidth);
      var columnTop = cloudY + 85 + columnMaxHeight - columnHeight;

      ctx.fillStyle = (names[i] === you) ? "rgba(255, 0, 0, 1)" : "rgba(0, 0, 255, " + Math.random() + ")";
      ctx.fillRect(columnLeft, columnTop, columnWidth, columnHeight);

      ctx.font = textFont;
      ctx.fillStyle = textColor;
      ctx.fillText(Math.round(times[i]), columnLeft, columnTop - 10);
      ctx.fillText(names[i], columnLeft, columnTop + columnHeight + 20);
    }
  };

  drawCloud(ctx);
  drawHistogram(ctx, names, times);
};