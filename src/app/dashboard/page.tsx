"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useEffect, useState } from "react";

interface TriggerItem {
  priority: string;
  hosts: { hostid: string; host: string; name: string }[];
  groups: { groupid: string; name: string }[];
}

interface SeverityCount {
  disaster: number;
  high: number;
  average: number;
  warning: number;
  information: number;
  not_classified: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<Record<string, SeverityCount>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/zabbix/problems", {
          method: "POST",
        });

        const response = await res.json();
        // Ensure the response has the expected shape. If not, fall back to an empty array
        if (!response || !Array.isArray(response.result)) {
          console.warn("Unexpected API response for triggers:", response);
        }

        const triggers: TriggerItem[] = Array.isArray(response?.result)
          ? response.result
          : [];

        const groupData: Record<string, SeverityCount> = {};

        triggers.forEach((trigger) => {
          trigger.groups.forEach((group) => {
            const groupName = group.name;

            if (!groupData[groupName]) {
              groupData[groupName] = {
                disaster: 0,
                high: 0,
                average: 0,
                warning: 0,
                information: 0,
                not_classified: 0,
              };
            }

            switch (trigger.priority) {
              case "5":
                groupData[groupName].disaster++;
                break;
              case "4":
                groupData[groupName].high++;
                break;
              case "3":
                groupData[groupName].average++;
                break;
              case "2":
                groupData[groupName].warning++;
                break;
              case "1":
                groupData[groupName].information++;
                break;
              case "0":
                groupData[groupName].not_classified++;
                break;
            }
          });
        });

        setData(groupData);
      } catch (error) {
        console.error("Error fetching triggers:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Problems by Severity</h1>

      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="p-3 text-left">Host Group</th>
              <th className="p-3">Disaster</th>
              <th className="p-3">High</th>
              <th className="p-3">Average</th>
              <th className="p-3">Warning</th>
              <th className="p-3">Information</th>
              <th className="p-3">Not Classified</th>
            </tr>
</thead>

<tbody>
            {Object.entries(data).map(([group, values]) => (
              <tr key={group} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{group}</td>

                <td className="p-3 text-center text-red-600">{values.disaster}</td>
                <td className="p-3 text-center text-red-400">{values.high}</td>
                <td className="p-3 text-center text-orange-500">{values.average}</td>
                <td className="p-3 text-center text-yellow-500">{values.warning}</td>
                <td className="p-3 text-center text-blue-500">{values.information}</td>
                <td className="p-3 text-center text-gray-500">{values.not_classified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}