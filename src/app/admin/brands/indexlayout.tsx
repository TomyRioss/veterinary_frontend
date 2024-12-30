import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { RefreshCcw } from 'lucide-react';

// import { resetPassword } from '../pages/auth/auth.service';
// import { categoriesService } from './categories/categories.service';
// import { PageLayout } from './pagelayout';

import { MultiSelect, Option } from '@/components/custom/multiselect';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Category } from '@/models/category';

// import { PasswordReset, passwordResetSchema } from '@/schemas/usersschema';

interface EntityWithCategories {
  categories: { id: number }[];
}

interface EntityPageProps<T extends EntityWithCategories> {
  title: string;
  newEntityLabel: string;
  newEntityIcon: React.ReactNode;
  service: {
    getEntities?: () => Promise<{ status: number; data: T[] }>;
    deleteEntity?: (id: number) => Promise<{ status: number }>;
    [key: string]: any; // Allow other methods as needed
  };
  generateColumns: (
    onDelete: (id: number) => void,
    onPasswordReset?: (id: number) => void,
  ) => any;
  entityFilterKey: string;
  filterByCategory?: boolean;
  enablePasswordReset?: boolean;
  entityName: string;
  DataTableComponent: React.ComponentType<{
    data: T[];
    columns: any;
    viewActions?: { filterByCategory: () => void };
    filter: { key: string; placeholder: string };
  }>;
}

export function GenericEntityPage<T extends EntityWithCategories>({
  title,
  newEntityLabel,
  newEntityIcon,
  service,
  generateColumns,
  entityFilterKey,
  filterByCategory,
  enablePasswordReset,
  entityName,
  DataTableComponent,
}: EntityPageProps<T>) {
  const [entities, setEntities] = useState<T[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [entityId, setEntityId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openResetPassword, setOpenResetPassword] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const getAndSetEntities = async () => {
    setLoading(true);

    if (service.getEntities) {
      const res = await service.getEntities();
      if (res.status === 200) console.log(res.data);
      //setEntities(res.data);
      else
        toast({
          title: 'Something went wrong.',
          description: `Couldn't get the ${entityName}s.`,
        });
    } else {
      toast({
        title: 'Error',
        description: 'getEntities method is not defined in the service.',
      });
    }

    // if (filterByCategory) {
    //   getAndSetCategories();
    // }

    setLoading(false);
  };

  //   const getAndSetCategories = async () => {
  //     if (categoriesService.getEntities) {
  //       const res = await categoriesService.getEntities();
  //       if (res.status === 200)
  //         setCategories(
  //           res.data.map((cat: Category) => {
  //             return { value: cat.id, label: cat.name };
  //           }),
  //         );
  //       else
  //         toast({
  //           title: 'Something went wrong.',
  //           description: `Couldn't get the Categories.`,
  //         });
  //     } else {
  //       toast({
  //         title: 'Error',
  //         description: 'getEntities method is not defined in the service.',
  //       });
  //     }
  //   };

  const openDeleteDialog = (id: number) => {
    setEntityId(id);
  };

  const openResetPasswordDialog = (id: number) => {
    setOpenResetPassword(id);
  };

  const deleteEntity = async () => {
    if (service.deleteEntity) {
      const res = await service.deleteEntity(entityId);
      if (res.status === 200) {
        // setEntities([
        //   ...entities.filter((entity) => (entity as any).id !== entityId),
        // ]);
      } else {
        toast({
          title: `Couldn't delete the ${entityName}.`,
          description: `This ${entityName} has data related to it. Please remove the data first.`,
        });
      }
    } else {
      toast({
        title: 'Error',
        description: 'deleteEntity method is not defined in the service.',
      });
    }

    setEntityId(0);
  };

  const columns = enablePasswordReset
    ? generateColumns(openDeleteDialog, openResetPasswordDialog)
    : generateColumns(openDeleteDialog);

  useEffect(() => {
    getAndSetEntities();
  }, []);

  //   const form = useForm<PasswordReset>({
  //     resolver: zodResolver(passwordResetSchema),
  //     defaultValues: {
  //       password: '',
  //       confirmPassword: '',
  //     },
  //   });

  //   const onSubmit = async (values: PasswordReset) => {
  //     setIsLoading(true);
  //     const { password } = values;
  //     const res = await resetPassword(
  //       password,
  //       openResetPassword,
  //       localStorage.getItem('token') || '',
  //     );
  //     if (res.status === 200) {
  //       toast({
  //         title: 'Password reset successful.',
  //         description: `Password reset successful for ${entityName} with id ${openResetPassword}.`,
  //       });
  //     } else {
  //       toast({
  //         title: 'Something went wrong.',
  //         description: `Couldn't reset password for ${entityName} with id ${openResetPassword}.`,
  //       });
  //     }
  //     setIsLoading(false);
  //     setOpenResetPassword(0);
  //   };

  return (
    // <PageLayout>
    <>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <div className="flex items-end justify-between w-full flex-wrap">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <div className="flex space-x-2">
            {/* <Button asChild>
              <Link
                href={`${location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname}/details`}
              >
                {newEntityIcon}
                {newEntityLabel}
              </Link>
            </Button> */}
            <Button
              variant="outline"
              onClick={getAndSetEntities}
              className="h-8 px-2 lg:px-3"
              disabled={loading}
            >
              {!loading ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Reload
                </>
              ) : (
                <>Loading...</>
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTableComponent
          data={
            selectedCategories.length > 0
              ? entities.filter(
                  (entity) =>
                    Array.isArray(entity.categories) &&
                    entity.categories.some((cat) =>
                      selectedCategories.includes(cat.id.toString()),
                    ),
                )
              : entities
          }
          columns={columns}
          viewActions={{ filterByCategory: () => setOpen(true) }}
          filter={{
            key: entityFilterKey,
            placeholder: `Search in the table...`,
          }}
        />
      </div>
      <AlertDialog open={Boolean(entityId)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the{' '}
              {entityName} and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setEntityId(0)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={deleteEntity}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {filterByCategory && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filter by Categories</DialogTitle>
              <DialogDescription>
                Select the categories you want to filter by.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <MultiSelect
                  options={categories}
                  placeholder="Select categories"
                  onChange={(value) => setSelectedCategories(value)}
                  selected={selectedCategories}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {enablePasswordReset && (
        <Dialog
          open={Boolean(openResetPassword)}
          onOpenChange={() => setOpenResetPassword(0)}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Reset password</DialogTitle>
              <DialogDescription>
                Reset password for the selected user.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                {/* <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                  >
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="******"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="******"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full lg:col-span-2"
                      disabled={isLoading}
                      loading={loading}
                    >
                      {isLoading ? 'Submitting...' : 'Reset password'}
                    </Button>
                  </form>
                </Form> */}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {/* </PageLayout> */}
    </>
  );
}
