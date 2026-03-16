import React from 'react'

const SkillsInput = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-8">Skills Management</h1>
    <div className="card">
      <p className="text-gray-600 mb-4">Add and manage your technical skills</p>
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full">JavaScript</span>
        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full">React</span>
        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full">Python</span>
        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full">Node.js</span>
      </div>
    </div>
  </div>
)

export default SkillsInput
