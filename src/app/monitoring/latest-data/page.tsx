"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  Radio,
  Select,
  Row,
  Col,
  Space,
  Checkbox,
  Table,
} from 'antd';
import axios from 'axios';
import type { FormProps } from 'antd';

type SizeType = Parameters<typeof Form>[0]['size'];

type HostGroup = {
  groupid: string;
  name: string;
};


export default function LatestDataPage() {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('small');
  const [form] = Form.useForm();
  const [hostGroups, setHostGroups] = useState<HostGroup[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(false);


  const onFormLayoutChange: FormProps<any>['onValuesChange'] = ({ size }) => {
    setComponentSize(size);
  };

//REQUEST TO GET HOST GROUPS
  const handlegetData = async () => {
    setLoadingGroups(true);
    const payload = {
      jsonrpc: "2.0",
      method: "template.get",
      params: {
        output: "extend",
        selectGroups: "extend",
        groupids: ["21"],
      },
      auth: "7de73a2634c45b95faaecb45d0429286005a442e974352f4431eaee833a66d00",
      id: 2,
    };

    try {
      const response = await axios.post('https://192.168.0.252/monitor/api_jsonrpc.php', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Normalize response to an array of items
      const items = response?.data?.result ?? response?.data ?? [];

      if (Array.isArray(items)) {
        const normalized = items.map((t: any) => ({
          groupid: String(t.templateid ?? t.groupid ?? t.id ?? ''),
          name: t.name ?? t.template ?? t.label ?? String(t),
        }));
        setHostGroups(normalized);
      } else {
        setHostGroups([]);
        console.warn('handlegetData - unexpected response shape', items);
      }
    } catch (err: any) {
      console.error('handlegetData - error', err);
    } finally {
      setLoadingGroups(false);
    }
  };

  useEffect(() => {
    handlegetData();
  }, []);

  // Log hostGroups whenever it changes so we can inspect values during runtime
  useEffect(() => {
    console.log('hostGroups updated', hostGroups);
  }, [hostGroups]);
  // Memoize columns to prevent recreation on each render
  const columns = useMemo(() => [
    { title: 'Host', dataIndex: 'host', key: 'host', width: 120 },
    { title: 'Name', dataIndex: 'name', key: 'name', width: 150 },
    { title: 'Last check', dataIndex: 'lastCheck', key: 'lastCheck', width: 140 },
    { title: 'Last value', dataIndex: 'lastValue', key: 'lastValue', width: 120 },
    { title: 'Change', dataIndex: 'change', key: 'change', width: 100 },
    { title: 'Tags', dataIndex: 'tags', key: 'tags', width: 150 },
    { title: 'Info', dataIndex: 'info', key: 'info' },
  ], []);

  const dataSource: any[] = [];

  // Memoize empty state component
  const emptyText = useMemo(() => (
    <div style={{ textAlign: 'center', padding: 32 }}>
      <div style={{ fontSize: 28, color: '#bfbfbf' }}>🔍</div>
      <div style={{ marginTop: 8, fontSize: 14, color: '#8c8c8c', fontWeight: 500 }}>Filter is not set</div>
      <div style={{ fontSize: 13, color: '#bfbfbf' }}>Use the filter to display results</div>
    </div>
  ), []);

  // Select state for Host groups
  const MAX_COUNT = 3;
  const [value, setValue] = useState<string[]>([]);
  const suffix = <span style={{ color: '#8c8c8c' }}>▾</span>;

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ size: 'small' }}
        onValuesChange={onFormLayoutChange}
        size="small"
        style={{ background: '#fafafa', padding: '16px', borderRadius: '8px' }}
      >
        <Row gutter={16}>
          {/* Left Column */}
          <Col span={8}>
            <Form.Item label="Host groups" style={{ marginBottom: 12 }}>
              <Row gutter={8}>
                <Col flex="2" >
                  <Select
                    mode="multiple"
                    maxCount={MAX_COUNT}
                    value={value}
                    loading={loadingGroups}
                    style={{ width: '100%' }}
                    onChange={setValue}
                    suffixIcon={suffix}
                    placeholder="Please select"
                    size="small"
                    options={hostGroups.map(g => ({ value: g.groupid, label: g.name }))}
                  />
                 
                </Col>

              </Row>
            </Form.Item>

            <Form.Item label="Hosts" style={{ marginBottom: 12 }}>
              <Row gutter={8}>
                <Col flex="1">
                  <Select
                    mode="multiple"
                    maxCount={MAX_COUNT}
                    value={value}
                    loading={loadingGroups}
                    style={{ width: '100%' }}
                    onChange={setValue}
                    suffixIcon={suffix}
                    placeholder="Please select"
                    size="small"
                    options={hostGroups.map(g => ({ value: g.groupid, label: g.name }))}
                  />
                </Col>
              </Row>
            </Form.Item>

            <Form.Item label="Name" style={{ marginBottom: 12 }}>
              <Input />
            </Form.Item>

            <Form.Item label="State" style={{ marginBottom: 12 }}>
              <Radio.Group defaultValue="all" buttonStyle="solid" size="small">
                <Radio.Button value="all">All</Radio.Button>
                <Radio.Button value="normal">Normal</Radio.Button>
                <Radio.Button value="not_supported">Not supported</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Checkbox>Show details</Checkbox>
            </Form.Item>
          </Col>

          {/* Middle Column */}
          <Col span={8}>
            <Form.Item label="Show tags" style={{ marginBottom: 12 }}>
              <Radio.Group defaultValue="3" buttonStyle="solid" size="small">
                <Radio.Button value="none">None</Radio.Button>
                <Radio.Button value="1">1</Radio.Button>
                <Radio.Button value="2">2</Radio.Button>
                <Radio.Button value="3">3</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Tag name" style={{ marginBottom: 12 }}>
              <Radio.Group defaultValue="full" buttonStyle="solid" size="small">
                <Radio.Button value="full">Full</Radio.Button>
                <Radio.Button value="short">Short</Radio.Button>
                <Radio.Button value="none">None</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Tag display priority" style={{ marginBottom: 12 }}>
              <Input placeholder="comma-separated list" />
            </Form.Item>
          </Col>

          {/* Right Column */}
          <Col span={8}>
            <Form.Item label="Tags" style={{ marginBottom: 12 }}>
              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                <Row gutter={8} align="middle">
                  <Col>
                    <Radio.Group size="small" defaultValue="and">
                      <Radio.Button value="and">And/Or</Radio.Button>
                      <Radio.Button value="or">Or</Radio.Button>
                    </Radio.Group>
                  </Col>
                  <Col flex="1">
                    <Input placeholder="tag" size="small" />
                  </Col>
                </Row>
                <Row gutter={8} align="middle">
                  <Col span={12}>
                    <Select defaultValue="Contains" style={{ width: '100%' }} size="small">
                      <Select.Option value="contains">Contains</Select.Option>
                      <Select.Option value="equals">Equals</Select.Option>
                      <Select.Option value="exists">Exists</Select.Option>
                      <Select.Option value="not_contains">Does not contain</Select.Option>
                      <Select.Option value="not_exists">Does not exist</Select.Option>
                      <Select.Option value="not_equals">Does not equal</Select.Option>
                    </Select>
                  </Col>
                  <Col span={12}>
                    <Input placeholder="value" size="small" />
                  </Col>
                </Row>
                <div>
                  <Button type="link" size="small" style={{ padding: '0 4px', height: 'auto' }}>+ Add</Button>
                  <Button type="link" size="small" style={{ padding: '0 4px', height: 'auto', marginLeft: 8 }}>Remove</Button>
                </div>
              </Space>
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center" style={{ marginTop: 16 }} gutter={12}>
          <Col>
            <Button size="middle">Save as</Button>
          </Col>
          <Col>
            <Button type="primary" size="middle" className="apply-bolt">Apply</Button>
          </Col>
          <Col>
            <Button size="middle">Reset</Button>
          </Col>
        </Row>
      </Form>

      <div style={{ marginTop: 20 }}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          size="small"
          locale={{ emptyText }}
          rowKey={(record, index) => index?.toString() || '0'}
          bordered
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', background: '#f5f7f9', border: '1px solid #e8e8e8', borderTop: 'none' }}>
          <div style={{ color: '#8c8c8c', fontSize: 13 }}>0 selected</div>
          <Space size={8}>
            <Button size="small" disabled>Display stacked graph</Button>
            <Button size="small" disabled>Display graph</Button>
            <Button size="small" disabled>Execute now</Button>
          </Space>
        </div>
      </div>
    </div>
  );
}
