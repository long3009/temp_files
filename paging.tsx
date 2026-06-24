import { Box, IconButton, Select, MenuItem, Typography, TextField } from '@mui/material'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

interface Props {
  pageIndex: number
  pageSize: number
  totalRows: number
  pageSizeOptions: number[]
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export const DataTablePagination = ({
  pageIndex,
  pageSize,
  totalRows,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: Props) => {
  const totalPages = Math.ceil(totalRows / pageSize)
  const currentPage = pageIndex + 1

  // Tính range các page button hiển thị (tối đa 5)
  const getPageRange = () => {
    const delta = 2
    const left = Math.max(1, currentPage - delta)
    const right = Math.min(totalPages, currentPage + delta)
    const pages: (number | '...')[] = []

    if (left > 1) {
      pages.push(1)
      if (left > 2) pages.push('...')
    }

    for (let i = left; i <= right; i++) pages.push(i)

    if (right < totalPages) {
      if (right < totalPages - 1) pages.push('...')
      pages.push(totalPages)
    }

    return pages
  }

  const from = totalRows === 0 ? 0 : pageIndex * pageSize + 1
  const to = Math.min(currentPage * pageSize, totalRows)

  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 1, px: 2, py: 1,
      borderTop: '1px solid', borderColor: 'divider',
    }}>

      {/* Rows per page */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">Rows per page:</Typography>
        <Select
          size="small"
          value={pageSize}
          onChange={e => onPageSizeChange(Number(e.target.value))}
          sx={{ fontSize: 14, '.MuiSelect-select': { py: '4px' } }}
        >
          {pageSizeOptions.map(opt => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </Select>
        <Typography variant="body2" color="text.secondary">
          {from}–{to} of {totalRows}
        </Typography>
      </Box>

      {/* Page buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {/* First */}
        <IconButton size="small" onClick={() => onPageChange(0)} disabled={pageIndex === 0}>
          <FirstPageIcon fontSize="small" />
        </IconButton>

        {/* Prev */}
        <IconButton size="small" onClick={() => onPageChange(pageIndex - 1)} disabled={pageIndex === 0}>
          <NavigateBeforeIcon fontSize="small" />
        </IconButton>

        {/* Page numbers */}
        {getPageRange().map((page, i) =>
          page === '...' ? (
            <Typography key={`ellipsis-${i}`} sx={{ px: 1, color: 'text.secondary' }}>
              ...
            </Typography>
          ) : (
            <Box
              key={page}
              onClick={() => onPageChange((page as number) - 1)}
              sx={{
                minWidth: 32, height: 32,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 1, cursor: 'pointer', fontSize: 14,
                fontWeight: page === currentPage ? 600 : 400,
                bgcolor: page === currentPage ? 'primary.main' : 'transparent',
                color: page === currentPage ? 'primary.contrastText' : 'text.primary',
                '&:hover': {
                  bgcolor: page === currentPage ? 'primary.dark' : 'action.hover',
                },
              }}
            >
              {page}
            </Box>
          )
        )}

        {/* Next */}
        <IconButton size="small" onClick={() => onPageChange(pageIndex + 1)} disabled={currentPage === totalPages}>
          <NavigateNextIcon fontSize="small" />
        </IconButton>

        {/* Last */}
        <IconButton size="small" onClick={() => onPageChange(totalPages - 1)} disabled={currentPage === totalPages}>
          <LastPageIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )
}



// ✅ Thay bằng
{enablePagination && (
  <DataTablePagination
    pageIndex={pagination.pageIndex}
    pageSize={pagination.pageSize}
    totalRows={isServerSide ? serverPagination!.totalRows : initialData.length}
    pageSizeOptions={pageSizeOptions}
    onPageChange={(page) => setPagination(p => ({ ...p, pageIndex: page }))}
    onPageSizeChange={(size) => setPagination({ pageIndex: 0, pageSize: size })}
  />
)}
