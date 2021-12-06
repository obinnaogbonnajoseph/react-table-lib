import React, { useEffect, useState } from 'react';
import './TableDemo.css';
import Table from '../Table/Table';

const TableDemo = () => {
  const [data, setData] = useState([]);
  const [normalData, setNormalData] = useState([])
  const [sortHeaders, setSortHeaders] = useState([]);
  const [moreOptions, setMoreOptions] = useState([]);
  const [templateData, setTemplateData] = useState([]);

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
        sort: 'asc'
      },
      {
        value: 'email',
        sort: 'desc'
      }
    ])
  }, [])
  useEffect(() => {
    setMoreOptions([
      {
        text: 'Edit',
        action: (data) => { console.log('*** edit ***', data) }
      },
      {
        text: 'Delete',
        action: (data) => { console.log('*** delete ***', data) }
      }
    ])
  }, [])
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
          (<div>Hello world</div>) :
          (<div>Hi there</div>)
      }
    })))
  }, [data])
  const allSelectedRows = rows => console.log('*** selected rows ***', rows.length);
  return (
    <div className="flex flex-col">
      <div className={`my-20 ${borderBottom}`}>
        <Table data={normalData} caption="Normal table" />
      </div>
      <div className={`my-20 ${borderBottom}`}>
        <Table data={normalData} size="dense" caption="Dense Table" />
      </div>
      <div className={`my-20 ${borderBottom}`}>
        <Table sortHeaders={sortHeaders} data={normalData} caption="Table with sort column" />
      </div>
      <div className={`my-20 ${borderBottom}`}>
        <Table data={normalData} checkbox={true} caption="Table with checkbox" allSelectedRows={rows => allSelectedRows(rows)} />
      </div>
      <div className={`my-20 ${borderBottom}`}>
        <Table data={templateData} caption="Table with templates" />
      </div>
      <div className={`my-20 ${borderBottom}`}>
        <Table data={normalData} moreOptions={moreOptions} caption="Table with more options" />
      </div>
      <div className={`my-20 ${borderBottom}`}>
        <Table data={normalData} paginate={true} caption="Table with pagination" />
      </div>
    </div>
  )
};

TableDemo.propTypes = {};

TableDemo.defaultProps = {};

export default TableDemo;
