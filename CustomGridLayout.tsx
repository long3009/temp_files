import { useState, useCallback, useMemo, memo } from 'react'
import {
  GridLayout,
  useContainerWidth,
  type LayoutItem,
  type Layout,
} from 'react-grid-layout'
import {
  Box, Paper, Typography, IconButton, Tooltip, Divider,
} from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import type { CustomGridLayoutProps, GridItem } from './types'

// ─── Storage helpers ──────────────────────────────────────────────────────────
const loadLayout = (key: string): LayoutItem[] | null => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

const saveLayout = (key: string, layout: readonly LayoutItem[]) => {
  try { localStorage.setItem(key, JSON.stringify(layout)) } catch {}
}

// ─── Build default layout ─────────────────────────────────────────────────────
const buildDefaultLayout = (items: GridItem[], cols: number): LayoutItem[] =>
  items.map((item, i) => ({
    i: item.id,
    x: (i * 4) % cols,
    y: Math.floor(i / (cols / 4)) * 4,
    w: 4,
    h: 4,
    minW: 2,
    minH: 2,
    ...item.defaultLayout,
  }))

// ─── Widget Card — memo để tránh re-render khi drag ──────────────────────────
const WidgetCard = memo(({
  item,
  editable,
}: {
  item: GridItem
  editable: boolean
}) => (
  <Paper
    variant="outlined"
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'box-shadow 0.2s',
      '&:hover': editable ? { boxShadow: 3 } : {},
    }}
  >
    {(item.title || editable) && (
      <>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          minHeight: 44,
        }}>
          {item.title && (
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {item.title}
            </Typography>
          )}
          {editable && (
            <Tooltip title="Kéo để di chuyển">
              <IconButton
                size="small"
                className="drag-handle"
                sx={{ ml: 'auto', cursor: 'grab', color: 'text.disabled' }}
              >
                <DragIndicatorIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Divider />
      </>
    )}
    <Box sx={{ flex: 1, overflow: 'hidden', p: 1.5 }}>
      {item.content}
    </Box>
  </Paper>
))
WidgetCard.displayName = 'WidgetCard'

// ─── Main Component ───────────────────────────────────────────────────────────
export const CustomGridLayout = ({
  items,
  cols = 12,
  rowHeight = 80,
  editable = true,
  storageKey = 'custom-grid-layout',
  gap = [12, 12],
  onLayoutChange,
}: CustomGridLayoutProps) => {
  const { width, containerRef, mounted } = useContainerWidth()

  const initialLayout = useMemo((): Layout => {
    const defaults = buildDefaultLayout(items, cols)
    if (storageKey) {
      const saved = loadLayout(storageKey)
      if (saved) {
        const savedMap = new Map(saved.map(l => [l.i, l]))
        return defaults.map(d => savedMap.get(d.i) ?? d)
      }
    }
    return defaults
  }, []) // chỉ chạy 1 lần khi mount

  // Dùng useState thay useGridLayout — tránh conflict với GridLayout internal state
  const [layout, setLayout] = useState<Layout>(initialLayout)

  const handleLayoutChange = useCallback((newLayout: Layout) => {
    setLayout(newLayout)
    if (storageKey) saveLayout(storageKey, newLayout)
    onLayoutChange?.(newLayout)
  }, [storageKey, onLayoutChange])

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        '& .react-grid-item.react-grid-placeholder': {
          bgcolor: 'primary.main',
          opacity: 0.15,
          borderRadius: 1,
        },
        '& .react-resizable-handle': {
          opacity: editable ? 0.3 : 0,
          transition: 'opacity 0.2s',
          '&:hover': { opacity: editable ? 1 : 0 },
        },
      }}
    >
      {mounted && (
        <GridLayout
          width={width}
          layout={layout}
          gridConfig={{ cols, rowHeight, margin: gap }}
          dragConfig={{ enabled: editable, handle: '.drag-handle' }}
          resizeConfig={{ enabled: editable }}
          onLayoutChange={handleLayoutChange}
        >
          {items.map(item => (
            <Box key={item.id}>
              <WidgetCard item={item} editable={editable} />
            </Box>
          ))}
        </GridLayout>
      )}
    </Box>
  )
}
