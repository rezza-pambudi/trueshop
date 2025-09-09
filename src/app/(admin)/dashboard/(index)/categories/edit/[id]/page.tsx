import React from 'react'
import { getCategoryById } from '../../lib/data';
import { redirect } from 'next/navigation';
import FormCategory from '../../_components/form-category';

type Tparams = {
    id: string;
}

interface EditPageProps {
    params: Tparams;
}
export default async function EditPage({ params }: EditPageProps) {
const { id } = await params;
const data = await getCategoryById(id);

if(!data){
    return redirect('/dashboard/categories'); 
}

console.log(data);
    return (
        <FormCategory data={data} type="EDIT" />
    )
}
