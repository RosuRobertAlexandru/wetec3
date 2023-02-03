import { useState, useEffect } from 'react'
import CompanyStore from '../stores/CompanyStore'
import Company from './Company'

const store = new CompanyStore()

const CompanyList = () => {
	const [companies, setCompanies] = useState([])

	useEffect(()=>{
		setCompanies(store.getAll())
		store.emitter.addListener('UPDATE',()=>{
			setCompanies(store.getAll())
		})
	},[])

	const saveCompany = (id, company) => {
		store.saveOne(id, company)
	}
	
	return (
		<div>
		{
			companies.map((e,i)=>
			<Company key={i} item={e} onSave={saveCompany}/>)
		}
			
		</div>
	)
}

export default CompanyList
