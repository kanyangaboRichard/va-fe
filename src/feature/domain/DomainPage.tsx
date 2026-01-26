{/*import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminNav from '../../shared/components/AdminNav'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import {fetchDomains,fetchDomainAssessments,updateAssessment} from '../../../store/actions/domainActions'*/}

const DomainPage = () => {
  const dispatch = useAppDispatch()
  const { domainId } = useParams()

  const { domains, domain, isLoading } = useAppSelector(
    state => state.domains
  )

  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null)

  // Load domains once
  useEffect(() => {
    dispatch(fetchDomains())
  }, [])

  // Load assessments when domain changes
  useEffect(() => {
    if (selectedDomainId) {
      dispatch(fetchDomainAssessments(selectedDomainId))
    }
  }, [selectedDomainId])

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Vulnerability Assessment
        </h1>

        {/* DOMAIN LIST */}
        {!selectedDomainId && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map(d => (
              <div
                key={d.id}
                onClick={() => setSelectedDomainId(d.id)}
                className="cursor-pointer bg-white rounded-lg shadow p-6 hover:ring-2 hover:ring-indigo-600 transition"
              >
                <h2 className="text-lg font-medium text-gray-900">
                  {d.name}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  {d.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ASSESSMENTS */}
        {selectedDomainId && (
          <>
            <button
              onClick={() => setSelectedDomainId(null)}
              className="mb-6 text-sm text-indigo-600 hover:underline"
            >
              ← Back to Domains
            </button>

            <h2 className="text-xl font-semibold mb-2">
              {domain?.name}
            </h2>
            <p className="text-gray-600 mb-6">
              {domain?.description}
            </p>

            {domain?.controls.map(control => (
              <div
                key={control.id}
                className="bg-white rounded-lg shadow mb-6"
              >
                <div className="px-6 py-3 border-b bg-gray-50 font-medium">
                  {control.code} — {control.title}
                </div>

                <div className="p-6 space-y-5">
                  {control.assessments.map(a => (
                    <div
                      key={a.id}
                      className="grid grid-cols-12 gap-4 items-start"
                    >
                      {/* QUESTION */}
                      <div className="col-span-12 md:col-span-5 text-sm text-gray-800">
                        {a.question}
                      </div>

                      {/* ANSWER */}
                      <div className="col-span-12 md:col-span-3">
                        <select
                          value={a.answer ?? ''}
                          onChange={e =>
                            dispatch(
                              updateAssessment({
                                id: a.id,
                                answer: e.target.value
                              })
                            )
                          }
                          className="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="">Select</option>
                          <option value="YES">YES</option>
                          <option value="NO">NO</option>
                          <option value="NA">NA</option>
                        </select>
                      </div>

                      {/* FINDING */}
                      <div className="col-span-12 md:col-span-4">
                        <textarea
                          defaultValue={a.finding}
                          onBlur={e =>
                            dispatch(
                              updateAssessment({
                                id: a.id,
                                finding: e.target.value
                              })
                            )
                          }
                          placeholder="Finding / Remark"
                          className="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default DomainPage
