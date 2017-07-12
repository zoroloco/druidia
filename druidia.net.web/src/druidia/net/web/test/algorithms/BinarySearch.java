package druidia.net.web.test.algorithms;

public class BinarySearch {

	public static void main(String[] args) {
		int[] nums = {0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19};		
		System.out.println(search(nums,0,nums.length,413));
	}

	/**
	 * Performs a binary search.
	 * 
	 * @param nums
	 * @param i
	 * @param length
	 * @param j
	 * @return
	 */
	private static int search(int[] nums, int i, int length, int j) {
		int low = i;
		int high= length-1;
		int key = j;
		
		char cc = 'c';
		String foo = "0";
	
		
		while(low<=high){
			int mid = (low+high)/2;
			if(mid<key){
				low=mid+1;
			}
			else if(mid>key){
				high=mid-1;
			}
			else
				return mid;//key found
		}
		
		return -(low+1);//return -1 or next available index to insert.
	}

}
