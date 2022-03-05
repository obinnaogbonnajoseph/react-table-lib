import { useEffect, useState } from 'react';
import './TableDemo.css';
import { ApiData, DerivedDataSubType, DerivedDataType, MoreOptionsDataType, SortHeadersType } from '@models/models';
import Table from '../Table/Table';
import Chip from '../Chip/Chip';
import { removeRow } from '../Table/commons';

const TableDemo = () => {
  const [data, setData] = useState<ApiData[]>([]);
  const [normalData, setNormalData] = useState<DerivedDataType[]>([]);
  const [sortHeaders, setSortHeaders] = useState<SortHeadersType[]>([]);
  const [moreOptions, setMoreOptions] = useState<MoreOptionsDataType[]>([]);
  const [moreOptionsData, setMoreOptionsData] = useState<DerivedDataType[]>([]);
  const [templateData, setTemplateData] = useState<DerivedDataType[]>([]);

  const borderBottom = () => {
    return `tw-border-t-0 tw-border-l-0 tw-border-r-0 tw-border-b-2 tw-border-neutral-500 tw-border-solid tw-pb-12`
  }

  useEffect(() => {
    setData([
      {
        name: 'Guy Hawkins',
        email: 'curtis.weaver@example.com',
        joined: '6/1/19'
      },
      {
        name: 'Arlene McCoy',
        email: 'kenz.lawson@example.com',
        joined: '6/9/14'
      },
      {
        name: 'Esther Howard',
        email: 'bill.sanders@example.com',
        joined: '12/4/17'
      },
      {
        name: 'Jacob Jones',
        email: 'deanna.curtis@example.com',
        joined: '1/5/12'
      },
      {
        name: 'Albert Flores',
        email: 'jackson.graham@example.com',
        joined: '9/4/12'
      },
      {
        name: 'Eleanor Pena',
        email: 'willie.jennings@example.com',
        joined: '5/9/12'
      },
      {
        name: 'Jenny Wilson',
        email: 'michelle.rivera@example.com',
        joined: '1/3/14'
      },
      {
        name: 'Michael Jackson',
        email: 'jamey.parker@example.com',
        joined: '2/4/14'
      },
      {
        name: 'Bobby Willson',
        email: 'antholdt.bold@example.com',
        joined: '3/5/14'
      },
      {
        name: 'Jade Pilkerson',
        email: 'candice.james@example.com',
        joined: '4/6/14'
      },
      {
        name: 'Queen Rose',
        email: 'darlene.jeans@example.com',
        joined: '5/8/14'
      },
    ])
  }, [])
  useEffect(() => {
    setNormalData(data.map(val => ({
      name: {
        type: 'text',
        text: val.name
      },
      email: {
        type: 'text',
        text: val.email
      },
      joined: {
        type: 'text',
        text: val.joined
      }
    })))
  }, [data])
  useEffect(() => {
    setSortHeaders([
      {
        value: 'name',
        sort: 'asc',
      },
      {
        value: 'email',
        sort: 'desc'
      }
    ])
  }, [])
  useEffect(() => {
    setMoreOptionsData([...normalData])
    setMoreOptions([
      {
        text: 'Delete',
        icon: 'delete',
        action: (row: DerivedDataType) => {
          setMoreOptionsData(oldVal => removeRow(row, [...oldVal]))
        }
      }
    ])
  }, [normalData])
  useEffect(() => {
    setTemplateData(data.map(val => ({
      name: {
        type: 'text',
        text: val.name
      },
      email: {
        type: 'text',
        text: val.email
      },
      joined: {
        type: 'template',
        template: val.joined.includes('4') ?
          (<Chip text="subscribed" />) :
          (<Chip text="not subscribed" disabled={true} />)
      }
    })))
  }, [data])
  return (
    <div className="flex flex-col">
      <div className={`my-20 ${borderBottom} w-full`}>
        <Table data={normalData} caption="Normal table" />
      </div>
      <div className={`my-20 ${borderBottom} w-full`}>
        <Table data={normalData} size="dense" caption="Dense Table" />
      </div>
      <div className={`my-20 ${borderBottom} w-full`}>
        <Table sortHeaders={sortHeaders} data={normalData} caption="Table with sort columns" />
      </div>
      <div className={`my-20 ${borderBottom} w-full`}>
        <Table data={normalData} checkbox={true} caption="Table with checkbox" />
      </div>
      <div className={`my-20 ${borderBottom} w-full`}>
        <Table data={templateData} caption="Table with templates" />
      </div>
      <div className={`my-20 ${borderBottom} w-full`}>
        <Table data={moreOptionsData} moreOptions={moreOptions} caption="Table with more options" />
      </div>
      <div className={`my-20 ${borderBottom} w-full`}>
        <Table data={normalData} paginate={true} caption="Table with pagination" />
      </div>
    </div>
  )
};

export default TableDemo;
