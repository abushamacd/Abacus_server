
// migration interfaces
export type IMigration = {
  field_name: string
}

export type IMigrationFilterRequest = {
  searchTerm?: string | undefined
}
