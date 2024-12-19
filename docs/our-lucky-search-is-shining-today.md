# Our lucky search is shining today!

As more and more species get discovered, the list page reveals itself to be not super user friendly
for find a species quickly. To address that, we'll add a search bar to display a filtered list.

## 1. Search bar

In the list page, add a text input that will serve as search bar. Hook it to the controller so that
a method is called as soon as the searched value is modified.

## 2. Enhance the service

In our service, update the method that retrieves the list of species so that it can receive a search
string as argument and forward it to the API in the form of a search parameter.

## 3. Plug everything

Now in the list page controller, the method which is called upon search value modification should
trigger a new API call to retrieve the filtered list. When the filtered list is received, the list
page should update accordingly.

> 💡 Yes, this approach is sub-optimal as we could simply filter on the entire that was received
> upon page load. But building with the service allows us to easily switch to a paginated list in
> the future.

> 🟢 Validate this feature with :
>
> ```shell
> npm run test -- search-bar
> ```
