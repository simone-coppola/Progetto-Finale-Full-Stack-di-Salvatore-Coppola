import "./SkillChart.scss";

function SkillChart({ history = [] }) {

  if (history.length === 0) {
    return (
      <div className="skill-chart-empty">
        <p>
          Non ci sono ancora dati sufficienti
          per mostrare l'evoluzione.
        </p>
      </div>
    );
  }

  const width = 600;
  const height = 250;

  const padding = 40;

  const maxValue = 100;

  const getX = (index) => {
    if (history.length === 1) {
      return width / 2;
    }

    return (
      padding +
      (index / (history.length - 1)) *
        (width - padding * 2)
    );
  };

  const getY = (level) => {
    return (
      height -
      padding -
      (level / maxValue) *
        (height - padding * 2)
    );
  };

  const points = history
    .map((item, index) => {
      return `${getX(index)},${getY(item.level)}`;
    })
    .join(" ");

  return (
    <div className="skill-chart">

      <div className="chart-header">
        <div>
          <h3>Evoluzione</h3>
          <p>
            Andamento del livello nel tempo
          </p>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="chart"
      >

        {/* Linee orizzontali */}
        {[0, 25, 50, 75, 100].map((value) => (
          <line
            key={value}
            x1={padding}
            y1={getY(value)}
            x2={width - padding}
            y2={getY(value)}
            className="grid-line"
          />
        ))}

        {/* Etichette */}
        {[0, 25, 50, 75, 100].map((value) => (
          <text
            key={value}
            x="5"
            y={getY(value) + 4}
            className="chart-label"
          >
            {value}%
          </text>
        ))}

        {/* Linea del grafico */}
        <polyline
          points={points}
          className="chart-line"
          fill="none"
        />

        {/* Punti */}
        {history.map((item, index) => (
          <circle
            key={index}
            cx={getX(index)}
            cy={getY(item.level)}
            r="5"
            className="chart-point"
          />
        ))}

      </svg>

      {/* Date */}
      <div className="chart-dates">
        {history.map((item, index) => (
          <span key={index}>
            {item.date}
          </span>
        ))}
      </div>

    </div>
  );
}

export default SkillChart;