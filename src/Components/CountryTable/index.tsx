import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAnglesLeft,
  faAnglesRight,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Country, fetchCountriesThunk } from '../../redux/slices/countrySlice'
import Table from './Table'
import './CountryTable.scss'

function sliceData(data: Country[], page: number, rowsPerPage: number) {
  const start = (page - 1) * rowsPerPage
  const end = Math.min(page * rowsPerPage, data.length)
  return data.slice(start, end)
}

export function CountryTable() {
  const dispatch = useAppDispatch()
  const { filteredList } = useAppSelector((state) => state.country)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(fetchCountriesThunk())
  }, [])

  useEffect(() => {
    setPage(1)
  }, [filteredList])

  const rowsPerPage = 10
  const pages =
    filteredList.length === 0 ? 1 : Math.ceil(filteredList.length / rowsPerPage)
  const sliceList = sliceData(filteredList, page, rowsPerPage)

  const changePage = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    setPage(Number(target.value))
  }

  const hanldePrevPage = () => {
    setPage(page - 1)
  }

  const hanldeNextPage = () => {
    setPage(page + 1)
  }

  const hanldeFirstPage = () => {
    setPage(1)
  }

  const hanldeLastPage = () => {
    setPage(pages)
  }

  return (
    <>
      <div className="table-pagination">
        <FontAwesomeIcon
          icon={faAnglesLeft}
          className="page-icon first"
          onClick={hanldeFirstPage}
        />
        <div>
          <button
            aria-label="previous page"
            className="table-pagination-btn prev"
            disabled={page === 1 ? true : false}
            onClick={hanldePrevPage}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="page-icon" />
          </button>
          <label htmlFor="pageNumber">Page&nbsp;</label>
          <input
            id="pageNumber"
            className="table-page-input"
            type="number"
            min="1"
            max={pages}
            value={page}
            onChange={changePage}
          />
          <button
            aria-label="next page"
            className="table-pagination-btn next"
            disabled={page === pages ? true : false}
            onClick={hanldeNextPage}
          >
            <FontAwesomeIcon icon={faArrowRight} className="page-icon" />
          </button>
        </div>
        <FontAwesomeIcon
          icon={faAnglesRight}
          className="page-icon last"
          onClick={hanldeLastPage}
        />
      </div>
      <Table data={sliceList} />
    </>
  )
}
