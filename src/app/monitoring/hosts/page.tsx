"use client";

import { useEffect, useState, useMemo } from "react";

import {
  Button,
  Modal,
  Input,
  Select,
  Radio,
  Row,
  Col,
  Form,
  Checkbox,
  Space,
  Table,
  Descriptions,
} from "antd";
import type { CheckboxGroupProps } from "antd/es/checkbox";
import axios from "axios";

const { TextArea } = Input;

const options: CheckboxGroupProps<string>["options"] = [
  { label: "Server", value: "Server" },
  { label: "Proxy", value: "Proxy" },
  { label: "Proxy Group", value: "Proxy Group" },
];

const Host: React.FC = () => {
  const [title, setTitle] = useState('')
  const [userData, setUserData] = useState({
    host_name: "",
    visible_name: "",
    templates: "",
    host_groups: "",
    description: "",

  })
  const [modal2Open, setModal2Open] = useState(false);
  const [templateGrouplist, setTemplategrouplist] = useState('');
  const [hostGroups, setHostGroups] = useState<any[]>([]);
  const [form] = Form.useForm();
  const onFormLayoutChange = () => {};
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
  // var filters = [];
  const handleClick = async () => {
    const auth_token = "7de73a2634c45b95faaecb45d0429286005a442e974352f4431eaee833a66d00",
      names: any = [];
    try {
      const response = await axios.post("http://192.168.56.1:3000/api/api_host/api_template_group", {
        auth: auth_token,
        name: names
      });
      setTemplategrouplist(response.data.result);



    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handlegetData = async (v: String) => {
    console.log("v", v);
    const auth_token = "7de73a2634c45b95faaecb45d0429286005a442e974352f4431eaee833a66d00",
      template_group: any = [v];
    try {
      const response = await axios.post("http://192.168.56.1:3000/api/api_host/api_template", {
        auth: auth_token,
        template_group: template_group
      });

      console.log("data",response)
    } catch (err) {
      console.log("Error:", err);
    }
  }




  return (
    <>
      <div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <Button type="primary" onClick={() => { setModal2Open(true), handleClick() }}>
            Create Host
          </Button>
        </div>

        <Modal
          centered
          title="New Host"
          open={modal2Open}
          onOk={() => setModal2Open(false)}
          onCancel={() => setModal2Open(false)}
          width={900}
        >
          <Form layout="vertical">
            {/* Row 1 */}
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Form.Item
                  label="Host Name"
                  name="hostName"
                  rules={[{ required: true, message: "Host name is required" }]}
                >
                  <Input size="large" placeholder="Enter host name" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Visible Name"
                  name="visibleName"
                  rules={[{ required: true, message: "Visible name is required" }]}
                >
                  <Input size="large" placeholder="Enter visible name" />
                </Form.Item>
              </Col>
            </Row>

            {/* Row 2 */}
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Form.Item
                  label="Template"
                  name="template"
                  rules={[{ required: true, message: "Select a template" }]}
                >
                  <Select placeholder="Select group" size="large" onChange={handlegetData}>
                    {Array.isArray(templateGrouplist) &&
                      templateGrouplist.map((v) => (
                        <Select.Option key={v.name} value={v.name}>
                          {v.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Group"
                  name="group"
                  rules={[{ required: true, message: "Select a group" }]}
                >
                  <Select
                    size="large"
                    placeholder="Select group"
                    options={[
                      { value: "1", label: "Templates" },
                      { value: "2", label: "Templates/Application" },
                      { value: "3", label: "Templates/Cloud" },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Row 3 */}
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Form.Item
                  label="Group"
                  name="group"
                  rules={[{ required: true, message: "Select a group" }]}
                >
                  <Select
                    size="large"
                    placeholder="Select group"
                    options={[
                      { value: "1", label: "Templates" },
                      { value: "2", label: "Templates/Application" },
                      { value: "3", label: "Templates/Cloud" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Description" name="description">
                  <TextArea rows={4} placeholder="Enter description" />
                </Form.Item>
              </Col>
            </Row>

            {/* Row 4 */}
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Form.Item label="Category" name="category">
                  <Radio.Group
                    block
                    optionType="button"
                    options={options}
                    defaultValue="Server"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
      <div>
        {/* Restored UI: filters form, table columns, and controls */}
        {/**
         * The following block restores the filter form, select controls,
         * and the table area that were removed. It uses Ant Design
         * components already imported above.
         */}

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
                        style={{ width: '100%' }}
                        onChange={setValue}
                        suffixIcon={suffix}
                        placeholder="Please select"
                        size="small"
                        options={[
                          { value: 'Ava Swift', label: 'Ava Swift' },
                          { value: 'Cole Reed', label: 'Cole Reed' },
                          { value: 'Mia Blake', label: 'Mia Blake' },
                          { value: 'Jake Stone', label: 'Jake Stone' },
                          { value: 'Lily Lane', label: 'Lily Lane' },
                          { value: 'Ryan Chase', label: 'Ryan Chase' },
                          { value: 'Zoe Fox', label: 'Zoe Fox' },
                          { value: 'Alex Grey', label: 'Alex Grey' },
                          { value: 'Elle Blair', label: 'Elle Blair' },
                        ]}
                      />
                      <Select
                        mode="multiple"
                        maxCount={MAX_COUNT}
                        value={value}
                        style={{ width: '100%' }}
                        onChange={setValue}
                        suffixIcon={suffix}
                        placeholder="Please select"
                        size="small"
                        options={[
                          { value: 'Ava Swift', label: 'Ava Swift' },
                          { value: 'Cole Reed', label: 'Cole Reed' },
                          { value: 'Mia Blake', label: 'Mia Blake' },
                          { value: 'Jake Stone', label: 'Jake Stone' },
                          { value: 'Lily Lane', label: 'Lily Lane' },
                          { value: 'Ryan Chase', label: 'Ryan Chase' },
                          { value: 'Zoe Fox', label: 'Zoe Fox' },
                          { value: 'Alex Grey', label: 'Alex Grey' },
                          { value: 'Elle Blair', label: 'Elle Blair' },
                        ]}
                      />
                    </Col>

                  </Row>
                </Form.Item>

                <Form.Item label="Hosts" style={{ marginBottom: 12 }}>
                  <Row gutter={8}>
                    <Col flex="1">
                      <Input placeholder="type here to search" />
                    </Col>
                    <Col>
                      <Button>Select</Button>
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
                  <Space orientation="vertical" size={4} style={{ width: '100%' }}>
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
              rowKey={(record) => String(record?.hostid ?? record?.host ?? record?.id ?? JSON.stringify(record))}
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
      </div>
    </>
  );
};

export default Host;
