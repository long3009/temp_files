import { useCallback, useRef } from 'react'
import { Grid, Typography, Divider, Box } from '@mui/material'
import { AppChart, type ChartDataPoint } from './components/AppChart'

// ─── Static data ──────────────────────────────────────────────────────────────
const monthlyData = [
  { month: 'Jan', revenue: 4000, cost: 2400, profit: 1600 },
  { month: 'Feb', revenue: 3000, cost: 1398, profit: 1602 },
  { month: 'Mar', revenue: 6000, cost: 3800, profit: 2200 },
  { month: 'Apr', revenue: 8000, cost: 3908, profit: 4092 },
  { month: 'May', revenue: 5000, cost: 4800, profit: 200 },
  { month: 'Jun', revenue: 9000, cost: 3800, profit: 5200 },
]

const pieData = [
  { name: 'Admin', value: 400 },
  { name: 'User', value: 300 },
  { name: 'Editor', value: 200 },
  { name: 'Viewer', value: 100 },
]

const scatterData = Array.from({ length: 40 }, () => ({
  x: Math.round(Math.random() * 100),
  y: Math.round(Math.random() * 100),
}))

// ─── 1. Line đơn ─────────────────────────────────────────────────────────────
export const LineExample = () => (
  <AppChart
    type="line"
    data={monthlyData}
    xKey="month"
    title="Revenue (Line)"
    series={[
      { key: 'revenue', name: 'Revenue', color: '#1976d2' },
    ]}
    tooltip={{
      show: true,
      formatter: (v) => `$${v.toLocaleString()}`,
    }}
    yAxis={{ tickFormatter: (v) => `$${Number(v) / 1000}k`, width: 'auto' }}
    height={300}
  />
)

// ─── 2. Multiline ─────────────────────────────────────────────────────────────
export const MultilineExample = () => (
  <AppChart
    type="multiline"
    data={monthlyData}
    xKey="month"
    title="Revenue vs Cost vs Profit (Multiline)"
    series={[
      { key: 'revenue', name: 'Revenue', color: '#1976d2' },
      { key: 'cost', name: 'Cost', color: '#d32f2f' },
      { key: 'profit', name: 'Profit', color: '#388e3c', dotted: true },
    ]}
    tooltip={{
      show: true,
      formatter: (v) => `$${v.toLocaleString()}`,
    }}
    yAxis={{ tickFormatter: (v) => `$${Number(v) / 1000}k`, width: 'auto' }}
    legend={{ show: true, position: 'bottom' }}
    height={300}
  />
)

// ─── 3. Bar đơn ──────────────────────────────────────────────────────────────
export const BarExample = () => (
  <AppChart
    type="bar"
    data={monthlyData}
    xKey="month"
    title="Revenue (Bar)"
    series={[
      { key: 'revenue', name: 'Revenue', color: '#1976d2' },
    ]}
    height={300}
  />
)

// ─── 4. Multi Bar ─────────────────────────────────────────────────────────────
export const MultiBarExample = () => (
  <AppChart
    type="multibar"
    data={monthlyData}
    xKey="month"
    title="Revenue vs Cost (Multi Bar)"
    series={[
      { key: 'revenue', name: 'Revenue', color: '#1976d2' },
      { key: 'cost', name: 'Cost', color: '#f57c00' },
    ]}
    legend={{ show: true, position: 'top' }}
    height={300}
  />
)

// ─── 5. Stacked Bar ───────────────────────────────────────────────────────────
export const StackedBarExample = () => (
  <AppChart
    type="multibar"
    data={monthlyData}
    xKey="month"
    title="Cost + Profit Stacked"
    series={[
      { key: 'cost', name: 'Cost', color: '#f57c00', stackId: 'a' },
      { key: 'profit', name: 'Profit', color: '#388e3c', stackId: 'a' },
    ]}
    height={300}
  />
)

// ─── 6. Area đơn ──────────────────────────────────────────────────────────────
export const AreaExample = () => (
  <AppChart
    type="area"
    data={monthlyData}
    xKey="month"
    title="Revenue (Area)"
    series={[
      { key: 'revenue', name: 'Revenue', color: '#1976d2' },
    ]}
    height={300}
  />
)

// ─── 7. Multi Area ────────────────────────────────────────────────────────────
export const MultiAreaExample = () => (
  <AppChart
    type="multiarea"
    data={monthlyData}
    xKey="month"
    title="Revenue & Cost (Multi Area)"
    series={[
      { key: 'revenue', name: 'Revenue', color: '#1976d2' },
      { key: 'cost', name: 'Cost', color: '#d32f2f' },
    ]}
    legend={{ show: true, position: 'top' }}
    height={300}
  />
)

// ─── 8. Stacked Area ──────────────────────────────────────────────────────────
export const StackedAreaExample = () => (
  <AppChart
    type="multiarea"
    data={monthlyData}
    xKey="month"
    title="Stacked Area"
    series={[
      { key: 'cost', name: 'Cost', color: '#f57c00', stackId: 'a' },
      { key: 'profit', name: 'Profit', color: '#388e3c', stackId: 'a' },
    ]}
    height={300}
  />
)

// ─── 9. Pie ───────────────────────────────────────────────────────────────────
export const PieExample = () => (
  <AppChart
    type="pie"
    data={pieData}
    xKey="name"
    title="User Roles (Pie)"
    series={[{ key: 'value', name: 'Users' }]}
    colors={['#1976d2', '#388e3c', '#f57c00', '#d32f2f']}
    legend={{ show: true, position: 'bottom' }}
    height={300}
  />
)

// ─── 10. Point (Scatter) ──────────────────────────────────────────────────────
export const PointExample = () => (
  <AppChart
    type="point"
    data={scatterData}
    xKey="x"
    title="Scatter Plot (Point)"
    series={[{ key: 'y', name: 'Data Points', color: '#7b1fa2' }]}
    xAxis={{ label: 'X Axis' }}
    yAxis={{ label: 'Y Axis', width: 'auto' }}
    height={300}
  />
)

// ─── 11. Realtime ─────────────────────────────────────────────────────────────
export const RealtimeExample = () => {
  const counterRef = useRef(0)

  const handleTick = useCallback((current: ChartDataPoint[]): ChartDataPoint[] => {
    counterRef.current += 1
    return [
      ...current,
      {
        t: counterRef.current,
        value: Math.round(Math.random() * 100),
        avg: Math.round(40 + Math.random() * 20),
      },
    ]
  }, [])

  return (
    <AppChart
      type="multiline"
      data={[]}
      xKey="t"
      title="Realtime Monitor (1s interval)"
      series={[
        { key: 'value', name: 'Live Value', color: '#1976d2' },
        { key: 'avg', name: 'Average', color: '#f57c00', dotted: true },
      ]}
      realtimeInterval={1000}
      onRealtimeTick={handleTick}
      maxDataPoints={30}
      xAxis={{ hide: true }}
      yAxis={{ width: 'auto' }}
      legend={{ show: true, position: 'top' }}
      height={300}
    />
  )
}

// ─── 12. Loading state ────────────────────────────────────────────────────────
export const LoadingExample = () => (
  <AppChart
    type="line"
    data={[]}
    xKey="month"
    title="Loading State"
    series={[{ key: 'revenue', name: 'Revenue' }]}
    loading={true}
    height={300}
  />
)

// ─── 13. Empty state ──────────────────────────────────────────────────────────
export const EmptyExample = () => (
  <AppChart
    type="bar"
    data={[]}
    xKey="month"
    title="Empty State"
    series={[{ key: 'revenue', name: 'Revenue' }]}
    emptyText="Không có dữ liệu"
    height={300}
  />
)

// ─── Dashboard tổng hợp ───────────────────────────────────────────────────────
export const DashboardExample = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
      Chart Examples
    </Typography>

    <Grid container spacing={3}>
      {/* Row 1 */}
      <Grid size={{ xs: 12, md: 6 }}>
        <MultilineExample />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <MultiBarExample />
      </Grid>

      {/* Row 2 */}
      <Grid size={{ xs: 12, md: 6 }}>
        <MultiAreaExample />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <PieExample />
      </Grid>

      {/* Row 3 */}
      <Grid size={{ xs: 12, md: 6 }}>
        <StackedBarExample />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <PointExample />
      </Grid>

      {/* Row 4 — Realtime full width */}
      <Grid size={{ xs: 12 }}>
        <RealtimeExample />
      </Grid>
    </Grid>
  </Box>
)



/// update Point

if (type === 'point') {
  const {
    xKey: pxKey = 'x',
    yKey: pyKey = 'y',
    xLabel,
    yLabel,
    xUnit = '',
    yUnit = '',
    xTickFormatter,
    yTickFormatter,
  } = pointConfig ?? {}

  // Custom tooltip hiển thị đúng label x/y
  const PointTooltip = ({ active, payload }: TooltipContentProps<number, string>) => {
    if (!active || !payload?.length) return null
    const d = payload[0]?.payload  // raw data point
    return (
      <Paper
        elevation={3}
        sx={{
          p: 1.5,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', minWidth: 60 }}>
              {xLabel ?? pxKey}:
            </Typography>
            <Typography variant="caption">
              <strong>{d?.[pxKey]}{xUnit ? ` ${xUnit}` : ''}</strong>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', minWidth: 60 }}>
              {yLabel ?? pyKey}:
            </Typography>
            <Typography variant="caption">
              <strong>{d?.[pyKey]}{yUnit ? ` ${yUnit}` : ''}</strong>
            </Typography>
          </Box>
        </Box>
      </Paper>
    )
  }

  return (
    <ResponsiveContainer width={width} height={height}>
      <ScatterChart margin={{ bottom: xLabel ? 20 : 5, left: yLabel ? 10 : 5 }}>
        <CartesianGrid {...commonGrid} />
        <XAxis
          dataKey={pxKey}
          type="number"
          tick={{ fill: textColor, fontSize: 12 }}
          axisLine={{ stroke: gridColor }}
          tickLine={false}
          name={xLabel ?? pxKey}
          tickFormatter={xTickFormatter}
          label={xLabel
            ? { value: xLabel, position: 'insideBottom', offset: -10, fill: textColor, fontSize: 12 }
            : undefined
          }
        />
        <YAxis
          dataKey={pyKey}
          type="number"
          tick={{ fill: textColor, fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={'auto'}
          name={yLabel ?? pyKey}
          tickFormatter={yTickFormatter}
          label={yLabel
            ? { value: yLabel, angle: -90, position: 'insideLeft', offset: 10, fill: textColor, fontSize: 12 }
            : undefined
          }
        />
        {tooltip.show && <Tooltip content={<PointTooltip />} cursor={{ strokeDasharray: '3 3' }} />}
        {legendProps && <Legend {...legendProps} />}
        {series.map((s, i) => (
          <Scatter
            key={s.key}
            name={s.name ?? s.key}
            data={data}
            fill={getColor(s, i, colors)}
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  )
}
