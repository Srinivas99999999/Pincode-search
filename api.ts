import type { PostOffice, PostOfficeDisplay, PincodeResult } from './types';

const API_URL = 'https://api.postalpincode.in/pincode';

export async function searchByPincode(pincode: string): Promise<PostOfficeDisplay[]> {
  const res = await fetch(`${API_URL}/${encodeURIComponent(pincode.trim())}`);
  if (!res.ok) throw new Error('Network error');
  const data: PincodeResult[] = await res.json();
  if (!data[0] || ! isSuccess(data[0].Status) || !data[0].PostOffice) return [];
  return data[0].PostOffice.map(mapPostOffice);
}

export async function searchByPostOffice(
  name: string,
  filters?: { state?: string; district?: string }
): Promise<PostOfficeDisplay[]> {
  const url = new URL('https://api.postalpincode.in/postoffice');
  url.pathname += '/' + encodeURIComponent(name.trim());
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Network error');
  const data: PincodeResult[] = await res.json();
  if (!data[0] || ! isSuccess(data[0].Status) || !data[0].PostOffice) return [];
  let results = data[0].PostOffice.map(mapPostOffice);
  if (filters?.state) {
    results = results.filter((r) => r.state.toLowerCase() === filters.state!.toLowerCase());
  }
  if (filters?.district) {
    results = results.filter((r) => r.state.toLowerCase() === filters.district!.toLowerCase());
  }
  return results;
}

function isSuccess(status: string | number): boolean {
  return status === 'Success' || status === 200;
}

function mapPostOffice(po: PostOffice): PostOfficeDisplay {
  return {
    name: po.Name,
    branchType: po.BranchType,
    deliveryStatus: po.DeliveryStatus,
    district: po.District,
    state: po.State,
    region: po.Region,
    block: po.Block,
    country: po.Country,
    pincode: po.Pincode,
  };
}
