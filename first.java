// public class first {
//     public static void main(String[] args) {
//         System.out.println("Hello, World!");
//     }
// }


import java.util.Scanner;
public class first { 
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) { 
            System.out.println("Enter marks for Maths (out of 100):");
            int a = sc.nextInt();
            System.out.println("Enter marks for Science (out of 100):");
            int b = sc.nextInt();
            System.out.println("Enter marks for Social Science (out of 100):");
            int c = sc.nextInt();
            System.out.println("Enter marks for English (out of 100):");
            int d = sc.nextInt();
            System.out.println("Enter marks for Hindi (out of 100):");
            int e = sc.nextInt();
            int sum = a + b + c + d + e;
            float percentage = (sum * 100) / 500.0f;
            System.out.println("Total Marks: " + sum);
            System.out.printf("Percentage: %.2f%%\n", percentage);
        }
    }
}
