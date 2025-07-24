import { useState, useEffect } from "react";
import '../Pages/Tracker.css';

function GPATracker() {
  const [formData, setFormData] = useState({
    year1: '',
    year2: '',
    year3: '',
    year4: ''
  });

  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const newChartData = [];
    
    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim() !== '' && !isNaN(parseFloat(value))) {
        const yearNum = parseInt(key.replace('year', ''));
        newChartData.push({
          year: `Year ${yearNum}`,
          gpa: parseFloat(value),
          yearNum: yearNum
        });
      }
    });
    
    newChartData.sort((a, b) => a.yearNum - b.yearNum);
    setChartData(newChartData);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      if (error) setError('');
    }
  };

  const validateGPA = (gpa) => {
    if (gpa === '') return true;
    const num = parseFloat(gpa);
    return !isNaN(num) && num >= 0 && num <= 4.0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setError('');
    
    const hasData = Object.values(formData).some(value => value.trim() !== '');
    if (!hasData) {
      setError('Please enter at least one GPA value');
      return;
    }
    
    for (const [key, value] of Object.entries(formData)) {
      if (value.trim() !== '' && !validateGPA(value)) {
        const yearNum = key.replace('year', '');
        setError(`Year ${yearNum} GPA must be between 0.0 and 4.0`);
        return;
      }
    }
    
    setIsSubmitting(true);
    
    console.log('Form data:', formData);
    console.log('Chart data:', chartData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Progress Chart Updated!');
    }, 1000);
  };

  const calculateStats = () => {
    if (chartData.length === 0) return null;
    
    const gpas = chartData.map(item => item.gpa);
    const average = gpas.reduce((sum, gpa) => sum + gpa, 0) / gpas.length;
    const highest = Math.max(...gpas);
    const lowest = Math.min(...gpas);
    const trend = chartData.length > 1 ? 
      (chartData[chartData.length - 1].gpa - chartData[0].gpa) : 0;
    
    return { average, highest, lowest, trend };
  };

  const createLineChart = () => {
    if (chartData.length === 0) return null;

    const width = 400;
    const height = 200;
    const padding = 40;

    const xStep = (width - 2 * padding) / Math.max(chartData.length - 1, 1);
    const yScale = (height - 2 * padding) / 4;

    const points = chartData.map((item, index) => ({
      x: padding + index * xStep,
      y: height - padding - (item.gpa * yScale)
    }));

    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');

    return (
      <svg width={width} height={height}>
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i}>
            <line 
              x1={padding} 
              y1={height - padding - (i * yScale)} 
              x2={width - padding} 
              y2={height - padding - (i * yScale)} 
              stroke="#f0f0f0" 
              strokeWidth="1"
            />
            <text 
              x={padding - 10} 
              y={height - padding - (i * yScale) + 5} 
              fontSize="12" 
              fill="#666"
              textAnchor="end"
            >
              {i.toFixed(1)}
            </text>
          </g>
        ))}
        
        {chartData.map((item, index) => (
          <text 
            key={index}
            x={padding + index * xStep} 
            y={height - padding + 20} 
            fontSize="12" 
            fill="#666"
            textAnchor="middle"
          >
            {item.year}
          </text>
        ))}
        
        <path 
          d={pathData} 
          stroke= "#cdafecff"
          strokeWidth="3" 
          fill="none"
        />
        
        {points.map((point, index) => (
          <g key={index}>
            <circle 
              cx={point.x} 
              cy={point.y} 
              r="5" 
              fill="#cdafecff"
            />
            <text 
              x={point.x} 
              y={point.y - 10} 
              fontSize="11" 
              fill="#cdafecff"
              textAnchor="middle"
            >
              {chartData[index].gpa.toFixed(2)}
            </text>
          </g>
        ))}
      </svg>
    );
  };

  const createBarChart = () => {
    if (chartData.length === 0) return null;

    const width = 400;
    const height = 200;
    const padding = 40;
    const barWidth = Math.max(30, (width - 2 * padding) / chartData.length - 10);

    return (
      <svg width={width} height={height}>
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i}>
            <line 
              x1={padding} 
              y1={height - padding - (i * (height - 2 * padding) / 4)} 
              x2={width - padding} 
              y2={height - padding - (i * (height - 2 * padding) / 4)} 
              stroke="#f0f0f0" 
              strokeWidth="1"
            />
            <text 
              x={padding - 10} 
              y={height - padding - (i * (height - 2 * padding) / 4) + 5} 
              fontSize="12" 
              fill="#666"
              textAnchor="end"
            >
              {i.toFixed(1)}
            </text>
          </g>
        ))}
        
        {chartData.map((item, index) => {
          const barHeight = (item.gpa / 4) * (height - 2 * padding);
          const x = padding + index * (barWidth + 10) + 10;
          const y = height - padding - barHeight;
          
          return (
            <g key={index}>
              <rect 
                x={x} 
                y={y} 
                width={barWidth} 
                height={barHeight} 
                fill="#cdafecff"
                rx="4"
              />
              <text 
                x={x + barWidth / 2} 
                y={y - 5} 
                fontSize="11" 
                fill="#cdafecff"
                textAnchor="middle"
              >
                {item.gpa.toFixed(2)}
              </text>
              <text 
                x={x + barWidth / 2} 
                y={height - padding + 15} 
                fontSize="12" 
                fill="#666"
                textAnchor="middle"
              >
                {item.year}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const stats = calculateStats();

  return (
    <div className="gpa-tracker">
      <div className="form-section">
        <h2>ACADEMIC SCORES</h2>
        
        {[1, 2, 3, 4].map(yearNum => (
          <div key={yearNum} className="input-group">
            <label>YEAR {yearNum}</label>
            <input 
              type="text" 
              name={`year${yearNum}`}
              value={formData[`year${yearNum}`]}
              onChange={handleInputChange}
              placeholder="Enter GPA (0.0-4.0)"
            />
          </div>
        ))}
        
        {error && <div className="error-message">{error}</div>}
        
        <button 
          type="submit" 
          className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
          onClick={handleSubmit}
          disabled={isSubmitting}
        > 
          {isSubmitting ? 'Analyzing...' : 'Analyze!'} 
        </button>
      </div>

      <div className="charts-section">
        {stats && (
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-value">{stats.average.toFixed(2)}</div>
              <div className="stat-label">Average GPA</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">{stats.highest.toFixed(2)}</div>
              <div className="stat-label">Highest GPA</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">{stats.lowest.toFixed(2)}</div>
              <div className="stat-label">Lowest GPA</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">{stats.trend >= 0 ? '+' : ''}{stats.trend.toFixed(2)}</div>
              <div className="stat-label">Trend</div>
            </div>
          </div>
        )}

        <div className="chart-container">
          <h3>GPA Progress Over Years</h3>
          
          <div className="chart-wrapper">
            {chartData.length > 0 ? createLineChart() : (
              <div className="chart-placeholder">Enter your GPA values to see the progress chart</div>
            )}
          </div>
        </div>

        <div className="chart-container">
          <h3>GPA Comparison by Year</h3>
          
          <div className="chart-wrapper">
            {chartData.length > 0 ? createBarChart() : (
              <div className="chart-placeholder">Enter your GPA values to see the comparison chart</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GPATracker;