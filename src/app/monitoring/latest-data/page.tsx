// "use client";

// import React, { useState, useMemo, useEffect } from 'react';
// import {
//   Button,
//   Form,
//   Input,
//   Radio,
//   Select,
//   Row,
//   Col,
//   Space,
//   Checkbox,
//   Table,
//   Flex,
// } from 'antd';
// import axios from 'axios';
// import type { FormProps } from 'antd';

// type SizeType = Parameters<typeof Form>[0]['size'];

// type HostGroup = {
//   groupid: string;
//   name: string;
// };


// export default function LatestDataPage() {
//   const [componentSize, setComponentSize] = useState<SizeType | 'default'>('small');
//   const [form] = Form.useForm();
//   const [hostGroups, setHostGroups] = useState<HostGroup[]>([]);
//   const [loadingGroups, setLoadingGroups] = useState(false);


//   const onFormLayoutChange: FormProps<any>['onValuesChange'] = ({ size }) => {
//     setComponentSize(size);
//   };


//   // const handlegetData = async () => {
//   //   const auth_token = "7de73a2634c45b95faaecb45d0429286005a442e974352f4431eaee833a66d00";
//   //   const names: any = [];


//   //   setLoadingGroups(true);

//   //   try {
//   //     const response = await axios.post('http://192.168.56.1:3000/api/api_Latest_data/hostgroup', {
//   //       auth: auth_token,
//   //       name: names,
//   //     });


//   //     console.log('handlegetData - response data', response;

//   //     // Try to parse groups from common shapes
//   //     const groupsCandidate = response?.data?.result ?? response?.data ?? [];
//   //     console.log('handlegetData - parsed groups candidate', groupsCandidate);

//   //     if (Array.isArray(groupsCandidate)) {
//   //       const normalized = groupsCandidate.map((g: any) => ({
//   //         groupid: g.groupid ?? g.id ?? '',
//   //         name: g.name ?? g.groupname ?? g.label ?? String(g),
//   //       }));
//   //       console.log('handlegetData - normalized groups', normalized);
//   //       setHostGroups(normalized);
//   //     } else {
//   //       console.warn('handlegetData - unexpected groups shape (not an array)', groupsCandidate);
//   //     }
//   //   } catch (err: any) {
//   //     console.error('handlegetData - caught error', err);
//   //     if (err?.response) {
//   //       console.error('handlegetData - error response data', err.response.data);
//   //       console.error('handlegetData - error response status', err.response.status);
//   //       console.error('handlegetData - error response headers', err.response.headers);
//   //     } else if (err?.request) {
//   //       console.error('handlegetData - no response received, request object:', err.request);
//   //     } else {
//   //       console.error('handlegetData - message', err?.message);
//   //     }
//   //   } finally {
//   //     setLoadingGroups(false);
//   //     console.log('handlegetData - finished, loadingGroups set to false');
//   //   }
//   // };

//   const handlegetData = async () => {
//     const auth_token = "7de73a2634c45b95faaecb45d0429286005a442e974352f4431eaee833a66d00";
//     const names: any = [];

//     try {
//       const response = await axios.post('http://192.168.56.1:3000/api/api_Latest_data/hostgroup', {
//         auth: auth_token,
//         name: names,
//       });
//       console.log(response);
//     }
//     catch {
//       console.log("error");
//     }

//   };

//   useEffect(() => {
//     handlegetData();
//   }, []);

//   // Log hostGroups whenever it changes so we can inspect values during runtime
//   useEffect(() => {
//     console.log('hostGroups updated', hostGroups);
//   }, [hostGroups]);
//   // Memoize columns to prevent recreation on each render
//   const columns = useMemo(() => [
//     { title: 'Host', dataIndex: 'host', key: 'host', width: 120 },
//     { title: 'Name', dataIndex: 'name', key: 'name', width: 150 },
//     { title: 'Last check', dataIndex: 'lastCheck', key: 'lastCheck', width: 140 },
//     { title: 'Last value', dataIndex: 'lastValue', key: 'lastValue', width: 120 },
//     { title: 'Change', dataIndex: 'change', key: 'change', width: 100 },
//     { title: 'Tags', dataIndex: 'tags', key: 'tags', width: 150 },
//     { title: 'Info', dataIndex: 'info', key: 'info' },
//   ], []);

//   const dataSource: any[] = [];

//   // Memoize empty state component
//   const emptyText = useMemo(() => (
//     <div style={{ textAlign: 'center', padding: 32 }}>
//       <div style={{ fontSize: 28, color: '#bfbfbf' }}>🔍</div>
//       <div style={{ marginTop: 8, fontSize: 14, color: '#8c8c8c', fontWeight: 500 }}>Filter is not set</div>
//       <div style={{ fontSize: 13, color: '#bfbfbf' }}>Use the filter to display results</div>
//     </div>
//   ), []);

//   // Select state for Host groups
//   const MAX_COUNT = 3;
//   const [value, setValue] = useState<string[]>([]);
//   const suffix = <span style={{ color: '#8c8c8c' }}>▾</span>;

//   return (
//     <div>
//       <Form
//         form={form}
//         layout="vertical"
//         initialValues={{ size: 'small' }}
//         onValuesChange={onFormLayoutChange}
//         size="small"
//         style={{ background: '#fafafa', padding: '16px', borderRadius: '8px' }}
//       >
//         <Row gutter={16}>
//           {/* Left Column */}
//           <Col span={8}>
//             <Form.Item label="Host groups" style={{ marginBottom: 12 }}>
//               <Row gutter={8}>
//                 <Col flex="2" >
//                   <Select
//                     mode="multiple"
//                     maxCount={MAX_COUNT}
//                     value={value}
//                     style={{ width: '100%' }}
//                     onChange={setValue}
//                     suffixIcon={suffix}
//                     placeholder="Please select"
//                     size="small"
//                     options={[
//                       { value: 'Ava Swift', label: 'Ava Swift' },
//                       { value: 'Cole Reed', label: 'Cole Reed' },
//                       { value: 'Mia Blake', label: 'Mia Blake' },
//                       { value: 'Jake Stone', label: 'Jake Stone' },
//                       { value: 'Lily Lane', label: 'Lily Lane' },
//                       { value: 'Ryan Chase', label: 'Ryan Chase' },
//                       { value: 'Zoe Fox', label: 'Zoe Fox' },
//                       { value: 'Alex Grey', label: 'Alex Grey' },
//                       { value: 'Elle Blair', label: 'Elle Blair' },
//                     ]}
//                   />
//                   <Select
//                     mode="multiple"
//                     maxCount={MAX_COUNT}
//                     value={value}
//                     style={{ width: '100%' }}
//                     onChange={setValue}
//                     suffixIcon={suffix}
//                     placeholder="Please select"
//                     size="small"
//                     options={[
//                       { value: 'Ava Swift', label: 'Ava Swift' },
//                       { value: 'Cole Reed', label: 'Cole Reed' },
//                       { value: 'Mia Blake', label: 'Mia Blake' },
//                       { value: 'Jake Stone', label: 'Jake Stone' },
//                       { value: 'Lily Lane', label: 'Lily Lane' },
//                       { value: 'Ryan Chase', label: 'Ryan Chase' },
//                       { value: 'Zoe Fox', label: 'Zoe Fox' },
//                       { value: 'Alex Grey', label: 'Alex Grey' },
//                       { value: 'Elle Blair', label: 'Elle Blair' },
//                     ]}
//                   />
//                 </Col>

//               </Row>
//             </Form.Item>

//             <Form.Item label="Hosts" style={{ marginBottom: 12 }}>
//               <Row gutter={8}>
//                 <Col flex="1">
//                   <Input placeholder="type here to search" />
//                 </Col>
//                 <Col>
//                   <Button>Select</Button>
//                 </Col>
//               </Row>
//             </Form.Item>

//             <Form.Item label="Name" style={{ marginBottom: 12 }}>
//               <Input />
//             </Form.Item>

//             <Form.Item label="State" style={{ marginBottom: 12 }}>
//               <Radio.Group defaultValue="all" buttonStyle="solid" size="small">
//                 <Radio.Button value="all">All</Radio.Button>
//                 <Radio.Button value="normal">Normal</Radio.Button>
//                 <Radio.Button value="not_supported">Not supported</Radio.Button>
//               </Radio.Group>
//             </Form.Item>

//             <Form.Item style={{ marginBottom: 0 }}>
//               <Checkbox>Show details</Checkbox>
//             </Form.Item>
//           </Col>

//           {/* Middle Column */}
//           <Col span={8}>
//             <Form.Item label="Show tags" style={{ marginBottom: 12 }}>
//               <Radio.Group defaultValue="3" buttonStyle="solid" size="small">
//                 <Radio.Button value="none">None</Radio.Button>
//                 <Radio.Button value="1">1</Radio.Button>
//                 <Radio.Button value="2">2</Radio.Button>
//                 <Radio.Button value="3">3</Radio.Button>
//               </Radio.Group>
//             </Form.Item>

//             <Form.Item label="Tag name" style={{ marginBottom: 12 }}>
//               <Radio.Group defaultValue="full" buttonStyle="solid" size="small">
//                 <Radio.Button value="full">Full</Radio.Button>
//                 <Radio.Button value="short">Short</Radio.Button>
//                 <Radio.Button value="none">None</Radio.Button>
//               </Radio.Group>
//             </Form.Item>

//             <Form.Item label="Tag display priority" style={{ marginBottom: 12 }}>
//               <Input placeholder="comma-separated list" />
//             </Form.Item>
//           </Col>

//           {/* Right Column */}
//           <Col span={8}>
//             <Form.Item label="Tags" style={{ marginBottom: 12 }}>
//               <Space direction="vertical" size={4} style={{ width: '100%' }}>
//                 <Row gutter={8} align="middle">
//                   <Col>
//                     <Radio.Group size="small" defaultValue="and">
//                       <Radio.Button value="and">And/Or</Radio.Button>
//                       <Radio.Button value="or">Or</Radio.Button>
//                     </Radio.Group>
//                   </Col>
//                   <Col flex="1">
//                     <Input placeholder="tag" size="small" />
//                   </Col>
//                 </Row>
//                 <Row gutter={8} align="middle">
//                   <Col span={12}>
//                     <Select defaultValue="Contains" style={{ width: '100%' }} size="small">
//                       <Select.Option value="contains">Contains</Select.Option>
//                       <Select.Option value="equals">Equals</Select.Option>
//                       <Select.Option value="exists">Exists</Select.Option>
//                       <Select.Option value="not_contains">Does not contain</Select.Option>
//                       <Select.Option value="not_exists">Does not exist</Select.Option>
//                       <Select.Option value="not_equals">Does not equal</Select.Option>
//                     </Select>
//                   </Col>
//                   <Col span={12}>
//                     <Input placeholder="value" size="small" />
//                   </Col>
//                 </Row>
//                 <div>
//                   <Button type="link" size="small" style={{ padding: '0 4px', height: 'auto' }}>+ Add</Button>
//                   <Button type="link" size="small" style={{ padding: '0 4px', height: 'auto', marginLeft: 8 }}>Remove</Button>
//                 </div>
//               </Space>
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row justify="center" style={{ marginTop: 16 }} gutter={12}>
//           <Col>
//             <Button size="middle">Save as</Button>
//           </Col>
//           <Col>
//             <Button type="primary" size="middle" className="apply-bolt">Apply</Button>
//           </Col>
//           <Col>
//             <Button size="middle">Reset</Button>
//           </Col>
//         </Row>
//       </Form>

//       <div style={{ marginTop: 20 }}>
//         <Table
//           columns={columns}
//           dataSource={dataSource}
//           pagination={false}
//           size="small"
//           locale={{ emptyText }}
//           rowKey={(record, index) => index?.toString() || '0'}
//           bordered
//         />

//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', background: '#f5f7f9', border: '1px solid #e8e8e8', borderTop: 'none' }}>
//           <div style={{ color: '#8c8c8c', fontSize: 13 }}>0 selected</div>
//           <Space size={8}>
//             <Button size="small" disabled>Display stacked graph</Button>
//             <Button size="small" disabled>Display graph</Button>
//             <Button size="small" disabled>Execute now</Button>
//           </Space>
//         </div>
//       </div>
//     </div>
//   );
// }





"use client";

import React, { useEffect, useState } from "react";
import { Form, Select, Button, Row, Col } from "antd";
import axios from "axios";

type HostGroup = {
  groupid: string;
  name: string;
};

export default function LatestDataPage() {
  const [form] = Form.useForm();
  const [hostGroups, setHostGroups] = useState<HostGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const fetchHostGroups = async () => {
    try {
      setLoading(true);

      const response = await axios.get("https://dummyjson.com/users");

      // Convert dummyjson users to HostGroup structure
      const mapped: HostGroup[] = response.data.users.map((user: any) => ({
        groupid: String(user.id),
        name: `${user.firstName} ${user.lastName}`,
      }));

      setHostGroups(mapped);
      console.log("Fetched groups:", mapped);
    } catch (err) {
      console.error("Error fetching dummy data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostGroups();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Host Groups">
              <Select
                mode="multiple"
                loading={loading}
                value={selectedValues}
                onChange={setSelectedValues}
                style={{ width: "100%" }}
                placeholder="Select host groups"
                options={hostGroups.map((g) => ({
                  value: g.groupid,
                  label: g.name,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center" gutter={10}>
          <Button type="primary">Apply</Button>
          <Button onClick={() => setSelectedValues([])}>Reset</Button>
        </Row>
      </Form>

      <pre style={{ marginTop: 20, background: "#111", color: "#0f0", padding: 10 }}>
        {JSON.stringify(hostGroups, null, 2)}
      </pre>
    </div>
  );
}
