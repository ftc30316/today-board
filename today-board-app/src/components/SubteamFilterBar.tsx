import { Chip, Stack } from '@mui/material'
import type { Subteam } from '../types/todayBoard'

type SubteamFilter = Subteam | 'All'

type SubteamFilterBarProps = {
  subteams: Subteam[]
  selectedFilter: SubteamFilter
  onSelectFilter: (filter: SubteamFilter) => void
}

function SubteamFilterBar({ subteams, selectedFilter, onSelectFilter }: SubteamFilterBarProps) {
  const filters: SubteamFilter[] = ['All', ...subteams]

  return (
    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
      {filters.map((filter) => {
        const selected = selectedFilter === filter

        return (
          <Chip
            key={filter}
            label={filter}
            clickable
            color={selected ? 'primary' : 'default'}
            variant={selected ? 'filled' : 'outlined'}
            onClick={() => onSelectFilter(filter)}
            sx={{ fontWeight: 800 }}
          />
        )
      })}
    </Stack>
  )
}

export default SubteamFilterBar
